import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry"
import {
  VeridaDatabaseGetRecordApiResponseSchema,
  VeridaDatabaseQueryApiResponseSchema,
} from "@/features/verida-database/schemas"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
  VeridaRecord,
} from "@/features/verida-database/types"

const logger = Logger.create("VeridaDatabase")

type FetchVeridaDataRecordsArgs<T = Record<string, unknown>> = {
  key?: string
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<T>
  options?: VeridaDatabaseQueryOptions<T>
}

const defaultVeridaDataRecordsQueryOptions: VeridaDatabaseQueryOptions = {
  skip: 0,
  limit: 10,
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
  key,
  databaseName,
  filter,
  options,
}: FetchVeridaDataRecordsArgs<T>): Promise<VeridaRecord<T>[]> {
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

    if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
      logger.warn(
        "Cannot fetch Verida data records due to incorrect API configuration"
      )
      throw new Error("Incorrect Private Data API configuration")
    }

    // Make API request to fetch data
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/db/query/${databaseName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "key": key,
        },
        body: JSON.stringify({ query: filter, options: resolvedOptions }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    // Validate the response data against the VeridaBaseRecordSchema
    const validatedData = VeridaDatabaseQueryApiResponseSchema.parse(data)

    // FIXME: This is a temporary fix to ensure the data is returned as an array of VeridaRecord<T>
    // We need to find a better way to type the data coming from the database.
    // Idea would be to pass a schema to the function and then use that schema
    // to validate the data. And concerning typescript, infer the returned type
    // from the schema.
    const records = validatedData.items as VeridaRecord<T>[]

    logger.info("Successfully fetched Verida data records", {
      databaseName,
    })

    return records
  } catch (error) {
    logger.error(
      new Error("Error fetching Verida data records", { cause: error })
    )
    throw error
  }
}

type FetchVeridaDataRecordArgs = {
  key?: string
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
  key,
  databaseName,
  recordId,
}: FetchVeridaDataRecordArgs): Promise<VeridaRecord<T>> {
  try {
    logger.debug("Fetching single Verida data record", {
      databaseName,
      recordId,
    })

    if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
      logger.warn(
        "Cannot fetch Verida data record due to incorrect API configuration"
      )
      throw new Error("Incorrect Private Data API configuration")
    }

    // Make API request to fetch data
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/db/get/${databaseName}/${recordId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "key": key,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    // Validate the response data against the VeridaDatabaseGetRecordApiResponseSchema
    const validatedData = VeridaDatabaseGetRecordApiResponseSchema.parse(data)

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
    logger.error(
      new Error("Error fetching single Verida data record", { cause: error })
    )
    throw error
  }
}
