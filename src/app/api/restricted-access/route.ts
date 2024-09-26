import { Client as NotionClient } from "@notionhq/client"
import { NextRequest, NextResponse } from "next/server"

import { serverConfig } from "@/config/server"
import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("restricted-access")

export type RestrictedAccessResponse = {
  access: RestrictedAccessStatus
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<RestrictedAccessResponse>> {
  const did = request.nextUrl.searchParams.get("did")

  if (!did) {
    logger.warn("No DID provided in request")
    return NextResponse.json({ access: "denied" }, { status: 400 })
  }

  try {
    const access = await getUserAccess(did)
    return NextResponse.json({ access })
  } catch (error) {
    logger.error(error)
    return NextResponse.json({ access: "denied" }, { status: 500 })
  }
}

async function getUserAccess(did: string): Promise<RestrictedAccessStatus> {
  try {
    const notion = new NotionClient({ auth: serverConfig.NOTION_API_KEY })

    const response = await notion.databases.query({
      database_id: serverConfig.NOTION_RESTRICTED_ACCESS_DATABASE_ID,
      filter: {
        property: "DID",
        rich_text: {
          equals: did,
        },
      },
    })

    const isAllowed = response.results.length > 0
    logger.debug("User access result", { did, isAllowed })

    return isAllowed ? "allowed" : "denied"
  } catch (error) {
    throw new Error("Something went wrong checking user access in Notion", {
      cause: error,
    })
  }
}
