import { Client } from "@notionhq/client"

import { serverConfig } from "@/config/server"
import { MarketplaceAppSchema } from "@/features/apps-marketplace/schemas"
import { MarketplaceApp } from "@/features/apps-marketplace/types"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("apps-marketplace")

/**
 * Fetches all apps of the marketplace.
 *
 * @returns Promise resolving to an array of MarketplaceApp objects.
 */
export async function getMarketplaceApps(): Promise<MarketplaceApp[]> {
  const notionClient = new Client({ auth: serverConfig.NOTION_API_KEY })
  const databaseId = serverConfig.NOTION_APPS_DATABASE_ID

  try {
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Featured",
          direction: "descending",
        },
        {
          property: "Name",
          direction: "ascending",
        },
      ],
    })

    const apps: MarketplaceApp[] = []

    for (const page of response.results) {
      try {
        const pageObject = page as any

        // Extract properties
        const id = page.id
        const nameProperty = pageObject.properties?.Name
        const name = nameProperty?.title?.[0]?.plain_text || "Unknown App"

        const urlProperty = pageObject.properties?.URL
        const url = urlProperty?.url || ""

        const descriptionProperty = pageObject.properties?.Description
        const description =
          descriptionProperty?.rich_text?.[0]?.plain_text || ""

        const logoProperty = pageObject.properties?.Logo
        const logoUrl =
          logoProperty?.files?.[0]?.file?.url ||
          logoProperty?.files?.[0]?.external?.url ||
          ""

        const categoriesProperty = pageObject.properties?.Categories
        const categories =
          categoriesProperty?.multi_select?.map((item: any) => item.name) || []

        const featuredProperty = pageObject.properties?.Featured
        const isFeatured = featuredProperty?.checkbox || false

        const app: MarketplaceApp = {
          id,
          label: name,
          url,
          description,
          logoUrl,
          categories,
          isFeatured,
        }

        // Validate the app with the schema
        const validationResult = MarketplaceAppSchema.safeParse(app)
        if (!validationResult.success) {
          logger.warn(`Invalid app data from Notion: ${id}`, {
            error: validationResult.error,
          })
          continue
        }

        apps.push(validationResult.data)
      } catch (error) {
        logger.error(error)
      }
    }

    return apps
  } catch (error) {
    logger.error(error)
    return []
  }
}
