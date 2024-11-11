import { commonConfig } from "@/config/common"
import { DATABASE_DEFS } from "@/features/data/constants"
import { Logger } from "@/features/telemetry"
import {
  VeridaDatabaseDeleteApiV1ResponseSchema,
  VeridaDatabaseGetRecordApiV1ResponseSchema,
  VeridaDatabaseQueryApiV1ResponseSchema,
} from "@/features/verida-database/schemas"
import {
  FetchVeridaDataRecordsResult,
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
  VeridaRecord,
} from "@/features/verida-database/types"

const logger = Logger.create("verida-database")

const defaultVeridaDataRecordsQueryOptions: VeridaDatabaseQueryOptions = {
  skip: 0,
  limit: 10,
}

export type FetchVeridaDataRecordsArgs<T = Record<string, unknown>> = {
  sessionToken: string
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<T>
  options?: VeridaDatabaseQueryOptions<T>
}

/**
 * Fetches Verida data records from the specified database.
 *
 * @param databaseName - The name of the database to query
 * @param filter - Optional query filter to apply to the records
 * @param options - Optional query parameters (sort, limit, skip)
 * @returns Promise resolving to an array of VeridaRecord objects
 */
export async function fetchVeridaDataRecords<T = Record<string, unknown>>({
  sessionToken,
  databaseName,
  filter,
  options,
}: FetchVeridaDataRecordsArgs<T>): Promise<FetchVeridaDataRecordsResult<T>> {
  try {
    const resolvedOptions = {
      // A simple merge is enough as the default options are not in nested objects
      ...defaultVeridaDataRecordsQueryOptions,
      ...options,
    }

    logger.debug("Fetching Verida data records", {
      databaseName,
      options: resolvedOptions,
    })

    if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
      logger.warn(
        "Cannot fetch Verida data records due to incorrect API configuration"
      )
      throw new Error("Incorrect Private Data API configuration")
    }

    // Make API request to fetch data
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/db/query/${databaseName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
        body: JSON.stringify({ query: filter, options: resolvedOptions }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    // Validate the response data against the VeridaBaseRecordSchema
    const validatedData = VeridaDatabaseQueryApiV1ResponseSchema.parse(data)

    logger.info("Successfully fetched Verida data records", {
      databaseName,
    })

    return {
      // FIXME: This is a temporary fix to ensure the data is returned as an
      // array of VeridaRecord<T>. We need to find a better way to type the
      // data coming from the database. Idea would be to pass a schema to the
      // function and then use that schema to validate the data. And concerning
      // typescript, infer the returned type from the schema.
      records: validatedData.items as VeridaRecord<T>[],
      pagination: {
        limit: validatedData.limit ?? null,
        skipped: validatedData.skip ?? null,
        unfilteredTotalRecordsCount: validatedData.dbRows ?? null,
      },
    }
  } catch (error) {
    throw new Error("Error fetching Verida data records", { cause: error })
  }
}

type FetchVeridaDataRecordArgs = {
  sessionToken: string
  databaseName: string
  recordId: string
}

/**
 * Fetches a single Verida data record from the specified database.
 *
 * @param key - API key for authentication
 * @param databaseName - The name of the database to query
 * @param recordId - The ID of the record to fetch
 * @returns Promise resolving to a single VeridaRecord object
 */
export async function fetchVeridaDataRecord<T = Record<string, unknown>>({
  sessionToken,
  databaseName,
  recordId,
}: FetchVeridaDataRecordArgs): Promise<VeridaRecord<T>> {
  try {
    logger.debug("Fetching single Verida data record", {
      databaseName,
      recordId,
    })

    if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
      logger.warn(
        "Cannot fetch Verida data record due to incorrect API configuration"
      )
      throw new Error("Incorrect Private Data API configuration")
    }

    // Make API request to fetch data
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/db/get/${databaseName}/${recordId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": sessionToken,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    // Validate the response data against the VeridaDatabaseGetRecordApiResponseSchema
    const validatedData = VeridaDatabaseGetRecordApiV1ResponseSchema.parse(data)

    // FIXME: This is a temporary fix to ensure the data is returned as VeridaRecord<T>
    // We need to find a better way to type the data coming from the database.
    // Idea would be to pass a schema to the function and then use that schema
    // to validate the data. And concerning typescript, infer the returned type
    // from the schema.
    const record = validatedData.item as VeridaRecord<T>

    logger.info("Successfully fetched single Verida data record", {
      databaseName,
      recordId,
    })

    return record
  } catch (error) {
    throw new Error("Error fetching single Verida data record", {
      cause: error,
    })
  }
}

export type DestroyVeridaDatabaseArgs = {
  sessionToken: string
  databaseName: string
}

/**
 * Destroys a Verida database.
 *
 * @param params - The parameters for destroying the database.
 * @param params.sessionToken - The session token for authentication.
 * @param params.databaseName - The name of the database to destroy.
 */
export async function destroyVeridaDatabase({
  sessionToken,
  databaseName,
}: DestroyVeridaDatabaseArgs) {
  await performVeridaDeleteOperation({ sessionToken, databaseName })
}

export type DeleteVeridaDataRecordArgs = {
  sessionToken: string
  databaseName: string
  recordId: string
}

/**
 * Deletes a single Verida data record from the specified database.
 *
 * @param params - The parameters for deleting the record.
 * @param params.sessionToken - The session token for authentication.
 * @param params.databaseName - The name of the database containing the record.
 * @param params.recordId - The ID of the record to delete.
 */
export async function deleteVeridaDataRecord({
  sessionToken,
  databaseName,
  recordId,
}: DeleteVeridaDataRecordArgs) {
  await performVeridaDeleteOperation({ sessionToken, databaseName, recordId })
}

type VeridaDeleteOperationArgs = {
  sessionToken: string
  databaseName: string
  recordId?: string
}

/**
 * Performs a delete operation on a Verida database or a single record.
 *
 * @param params - The parameters for the delete operation.
 * @param params.sessionToken - The session token for authentication.
 * @param params.databaseName - The name of the database.
 * @param params.recordId - The ID of the record to delete (optional).
 * @throws If the API configuration is incorrect, the database definition is not found, or the API operation fails.
 */
async function performVeridaDeleteOperation({
  sessionToken,
  databaseName,
  recordId,
}: VeridaDeleteOperationArgs) {
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot perform Verida delete operation due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  const operationType = recordId ? "record" : "database"
  logger.info(`Deleting Verida ${operationType}`, {
    databaseName,
    ...(recordId && { recordId }),
  })

  try {
    const databaseDef = DATABASE_DEFS.find(
      (def) => def.databaseVaultName === databaseName
    )
    if (!databaseDef) {
      throw new Error(`Database definition not found for ${databaseName}`)
    }

    const schemaUrlBase64 = Buffer.from(
      databaseDef.schemaUrlLatest,
      "utf8"
    ).toString("base64")

    const url = new URL(
      `/api/rest/v1/ds/${schemaUrlBase64}${recordId ? `/${recordId}` : ""}`,
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )
    url.searchParams.set("destroy", recordId ? "false" : "true")

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()
    const validatedData = VeridaDatabaseDeleteApiV1ResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info(`Successfully deleted Verida ${operationType}`, {
      databaseName,
      ...(recordId && { recordId }),
    })
  } catch (error) {
    throw new Error(`Error deleting Verida ${operationType}`, { cause: error })
  }
}
