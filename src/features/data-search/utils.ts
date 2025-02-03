import { commonConfig } from "@/config/common"
import { DEFAULT_SELECTED_SEARCH_TYPES } from "@/features/data-search/constants"
import { UniversalSearchV1ApiResponseSchema } from "@/features/data-search/schemas"
import { SearchDataArgs, SearchDataResult } from "@/features/data-search/types"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("search-data")

export async function searchData({
  sessionToken,
  searchValue,
  limit,
  minResultsPerType,
  searchTypes = DEFAULT_SELECTED_SEARCH_TYPES,
}: SearchDataArgs): Promise<SearchDataResult[]> {
  try {
    logger.debug("Searching data", {
      searchValue,
      limit,
      minResultsPerType,
      searchTypes,
    })

    const url = new URL(
      "/api/rest/v1/search/universal",
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )
    url.searchParams.set("keywords", searchValue)
    if (limit) {
      url.searchParams.set("limit", limit.toString())
    }
    if (minResultsPerType) {
      url.searchParams.set("minResultsPerType", minResultsPerType.toString())
    }

    url.searchParams.set("searchTypes", searchTypes.join(","))

    // Make API request to search data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    const validatedData = UniversalSearchV1ApiResponseSchema.parse(data)

    const results: SearchDataResult[] = validatedData.items
      .map((item) => ({
        id: item._id,
        name: item.name ?? "",
        databaseId:
          USER_DATABASE_DEFS.find((db) =>
            item.schema?.startsWith(db.schemaUrlBase)
          )?.id ?? "",
      }))
      .filter((result) => result.databaseId !== "")

    logger.info("Successfully searched data", {
      searchValue,
      limit,
      minResultsPerType,
      searchTypes,
    })

    logger.debug("Searched data results", {
      results,
    })

    return results
  } catch (error) {
    throw new Error("Error searching data", {
      cause: error,
    })
  }
}
