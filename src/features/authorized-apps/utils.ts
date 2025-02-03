import { MOCK_AUTHORIZED_APPS } from "@/features/authorized-apps/mock"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { Logger } from "@/features/telemetry/logger"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"

const logger = Logger.create("authorized-apps")

type GetAuthorizedAppsArgs = {
  sessionToken: string
  filter?: VeridaDatabaseQueryFilter<AuthorizedAppRecord>
  options?: VeridaDatabaseQueryOptions<AuthorizedAppRecord>
}

/**
 * Fetches authorized apps from the API.
 *
 * @param args - The options to apply to the authorized apps
 * @param args.sessionToken - The session token for authentication
 * @param args.filter - The filter to apply to the authorized apps
 * @param args.options - The options to apply to the authorized apps
 * @returns A promise that resolves to an array of AuthorizedApp
 * @throws Error if there's an issue fetching the authorized apps
 */
export async function getAuthorizedApps(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { sessionToken, filter, options }: GetAuthorizedAppsArgs
) {
  logger.info("Fetching authorized apps")

  try {
    // TODO: Implement getting authorized apps from the API
    // This whole function may not be necessary if getting the authorized apps
    // can be done via the generic verida database getRecords function.

    logger.debug("Returning mock authorized apps for now")
    const skip = options?.skip ?? 0
    const limit = options?.limit ?? MOCK_AUTHORIZED_APPS.length
    const paginatedRecords = MOCK_AUTHORIZED_APPS.slice(skip, skip + limit)

    return {
      records: paginatedRecords,
      pagination: {
        limit: limit,
        skipped: skip,
        unfilteredTotalRecordsCount: MOCK_AUTHORIZED_APPS.length,
      },
    }
  } catch (error) {
    throw new Error("Error fetching authorized apps", { cause: error })
  }
}

type GetAuthorizedAppArgs = {
  sessionToken: string
  authorizedAppRecordId: string
}

/**
 * Fetches a single authorized app from the API.
 *
 * @param args - The options to apply to the authorized app
 * @param args.sessionToken - The session token for authentication
 * @param args.authorizedAppRecordId - The ID of the authorized app record to fetch
 *
 * @returns A promise that resolves to an AuthorizedApp
 * @throws Error if there's an issue fetching the authorized app
 */
export async function getAuthorizedApp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { sessionToken, authorizedAppRecordId }: GetAuthorizedAppArgs
) {
  logger.info("Fetching authorized app")

  try {
    // TODO: Implement getting authorized apps from the API
    // This whole function may not be necessary if getting the authorized apps
    // can be done via the generic verida database getRecords function.

    logger.debug("Returning mock authorized apps for now")

    return MOCK_AUTHORIZED_APPS.find((app) => app._id === authorizedAppRecordId)
  } catch (error) {
    throw new Error("Error fetching authorized apps", { cause: error })
  }
}
