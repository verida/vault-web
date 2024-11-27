import { z } from "zod"

import { commonConfig } from "@/config/common"
import { ALL_DATABASE_DEFS } from "@/features/data/constants"
import { Logger } from "@/features/telemetry"
import {
  VeridaDatabaseDeleteApiV1ResponseSchema,
  getCreateVeridaRecordApiV1ResponseSchema,
  getUpdateVeridaRecordApiV1ResponseSchema,
  getVeridaDatabaseGetRecordApiV1ResponseSchema,
  getVeridaDatabaseQueryApiV1ResponseSchema,
} from "@/features/verida-database/schemas"
import {
  FetchVeridaDataRecordsResult,
  UnsavedVeridaRecord,
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
  VeridaRecord,
} from "@/features/verida-database/types"

const logger = Logger.create("verida-database")

const defaultVeridaDataRecordsQueryOptions: VeridaDatabaseQueryOptions = {
  skip: 0,
  limit: 10,
}

export type GetVeridaDataRecordsArgs<T extends z.ZodObject<any>> = {
  sessionToken: string
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<VeridaRecord<z.infer<T>>>
  options?: VeridaDatabaseQueryOptions<VeridaRecord<z.infer<T>>>
  baseSchema?: T
}

/**
 * Gets Verida data records from the specified database.
 *
 * @param params - Function parameters
 * @param params.sessionToken - The session token for authentication
 * @param params.databaseName - The name of the database to query
 * @param params.filter - Optional query filter to apply to the records
 * @param params.options - Optional query parameters (sort, limit, skip)
 * @param params.baseSchema - Optional base schema to extend the records with
 * @returns Promise resolving to an array of VeridaRecord objects
 */
export async function getVeridaDataRecords<T extends z.ZodObject<any>>({
  sessionToken,
  databaseName,
  filter,
  options,
  baseSchema,
}: GetVeridaDataRecordsArgs<T>): Promise<
  FetchVeridaDataRecordsResult<z.infer<T>>
> {
  const resolvedOptions = {
    // A simple merge is enough as the default options are not in nested objects
    ...defaultVeridaDataRecordsQueryOptions,
    ...options,
  }

  logger.info("Getting Verida records", {
    databaseName,
  })
  logger.debug("Get operation arguments", {
    databaseName,
    options: resolvedOptions,
  })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn("Cannot get Verida records due to incorrect API configuration")
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
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

    // Validate the response data
    const valdationSchema =
      getVeridaDatabaseQueryApiV1ResponseSchema(baseSchema)

    const validatedData = valdationSchema.parse(data)

    logger.info("Successfully got Verida records", {
      databaseName,
    })

    return {
      records: validatedData.items as VeridaRecord<z.infer<T>>[],
      pagination: {
        limit: validatedData.limit ?? null,
        skipped: validatedData.skip ?? null,
        unfilteredTotalRecordsCount: validatedData.dbRows ?? null,
      },
    }
  } catch (error) {
    throw new Error("Error getting Verida records", { cause: error })
  }
}

type GetVeridaDataRecordArgs<T extends z.ZodObject<any>> = {
  sessionToken: string
  databaseName: string
  recordId: string
  baseSchema?: T
}

/**
 * Gets a single Verida data record from the specified database.
 *
 * @param key - API key for authentication
 * @param databaseName - The name of the database to query
 * @param recordId - The ID of the record to fetch
 * @param baseSchema - Optional base schema to extend the record with
 * @returns Promise resolving to a single VeridaRecord object
 */
export async function getVeridaDataRecord<T extends z.ZodObject<any>>({
  sessionToken,
  databaseName,
  recordId,
  baseSchema,
}: GetVeridaDataRecordArgs<T>): Promise<VeridaRecord<z.infer<T>>> {
  logger.info("Getting a single Verida record", {
    databaseName,
  })
  logger.debug("Get operation arguments", {
    databaseName,
    recordId,
  })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot fetch Verida data record due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
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

    // Validate the response data
    const validationSchema =
      getVeridaDatabaseGetRecordApiV1ResponseSchema(baseSchema)

    const validatedData = validationSchema.parse(data)

    logger.info("Successfully got a Verida record", {
      databaseName,
      recordId,
    })

    return validatedData.item as VeridaRecord<z.infer<T>>
  } catch (error) {
    throw new Error("Error getting a Verida record", {
      cause: error,
    })
  }
}

type CreateVeridaDataRecordArgs<T extends z.ZodObject<any>> = {
  sessionToken: string
  databaseName: string
  record: UnsavedVeridaRecord<z.infer<T>>
  baseSchema?: T
}

/**
 * Creates a new Verida data record in the specified database.
 *
 * @template T - The type of the record being created.
 * @param params - The parameters for creating the record.
 * @param params.sessionToken - The session token for authentication.
 * @param params.databaseName - The name of the database to create the record in.
 * @param params.record - The record data to be created.
 * @returns A promise that resolves to the created Verida record.
 * @throws If the API configuration is incorrect or if the creation operation fails.
 */
export async function createVeridaDataRecord<T extends z.ZodObject<any>>({
  sessionToken,
  databaseName,
  record,
  baseSchema,
}: CreateVeridaDataRecordArgs<T>): Promise<VeridaRecord<z.infer<T>>> {
  logger.info("Creating a Verida record", {
    databaseName,
  })
  logger.debug("Create operation arguments", {
    databaseName,
    record,
  })

  // Check if the API base URL is configured
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot create Verida record due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    // Encode the schema URL for the database
    const schemaUrlBase64 = getEncodedSchemaFromDatabaseName(databaseName)

    // Construct the API endpoint URL
    const url = new URL(
      `/api/rest/v1/ds/${schemaUrlBase64}`,
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )

    // Make the API request to create the record
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
      body: JSON.stringify({
        record,
        // Note: `options` parameter is available if needed in the future
      }),
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    // Parse and validate the response data
    const validationSchema =
      getCreateVeridaRecordApiV1ResponseSchema(baseSchema)

    const data = await response.json()
    const validatedData = validationSchema.parse(data)

    // Check if the operation was successful
    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully created a Verida record", {
      databaseName,
    })

    // Return the created record
    // HACK: Had to assert the result because typescript doesn't recognise the
    // _id, probably because "_" is considered a private property
    return validatedData.record as VeridaRecord<z.infer<T>>
  } catch (error) {
    throw new Error("Error creating Verida data record", { cause: error })
  }
}

type UpdateVeridaDataRecordArgs<T extends z.ZodObject<any>> = {
  sessionToken: string
  databaseName: string
  record: VeridaRecord<z.infer<T>>
  baseSchema?: T
}

/**
 * Updates a Verida record in the specified database.
 *
 * This function sends a PUT request to the Verida API to update an existing record.
 * It handles the API communication, error checking, and response validation.
 *
 * @param params - The parameters for updating the record
 * @param params.sessionToken - The session token for authentication
 * @param params.databaseName - The name of the database containing the record
 * @param params.record - The record to be updated, including its _id
 * @returns A promise that resolves to the updated record
 * @throws If the API configuration is incorrect, the API request fails, or the operation is unsuccessful
 */
export async function updateVeridaDataRecord<T extends z.ZodObject<any>>({
  sessionToken,
  databaseName,
  record,
  baseSchema,
}: UpdateVeridaDataRecordArgs<T>): Promise<VeridaRecord<z.infer<T>>> {
  logger.info("Updating a Verida record", {
    databaseName,
  })
  logger.debug("Update operation arguments", {
    databaseName,
    record,
  })

  // Check if the API base URL is configured
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot update Verida record due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    // Encode the schema URL for the database
    const schemaUrlBase64 = getEncodedSchemaFromDatabaseName(databaseName)

    // Construct the API endpoint URL
    const url = new URL(
      `/api/rest/v1/ds/${schemaUrlBase64}/${record._id}`,
      commonConfig.PRIVATE_DATA_API_BASE_URL
    )

    // Make the API request to update the record
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
      body: JSON.stringify({
        record,
        // Note: `options` parameter is available if needed in the future
      }),
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    // Parse and validate the response data
    // TODO: Get the schema of the record from the arguments
    const validationSchema =
      getUpdateVeridaRecordApiV1ResponseSchema(baseSchema)

    const data = await response.json()
    const validatedData = validationSchema.parse(data)

    // Check if the operation was successful
    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully updated a Verida record", {
      databaseName,
    })

    // Return the updated record
    // HACK: Had to assert the result because typescript doesn't recognise the
    // _id, probably because "_" is considered a private property
    return validatedData.record as VeridaRecord<z.infer<T>>
  } catch (error) {
    throw new Error("Error updating Verida data record", { cause: error })
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
  const operationType = recordId ? "record" : "database"
  logger.info(`Deleting a Verida ${operationType}`, {
    databaseName,
  })
  logger.debug("Delete operation arguments", {
    databaseName,
    ...(recordId && { recordId }),
  })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot perform delete operation due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    const schemaUrlBase64 = getEncodedSchemaFromDatabaseName(databaseName)

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

    logger.info(`Successfully deleted a Verida ${operationType}`, {
      databaseName,
      ...(recordId && { recordId }),
    })
  } catch (error) {
    throw new Error(`Error deleting Verida ${operationType}`, { cause: error })
  }
}

function getEncodedSchemaFromDatabaseName(databaseName: string) {
  const databaseDef = ALL_DATABASE_DEFS.find(
    (def) => def.databaseVaultName === databaseName
  )

  if (!databaseDef) {
    throw new Error(`Database definition not found for ${databaseName}`)
  }

  return Buffer.from(databaseDef.schemaUrlLatest, "utf8").toString("base64")
}
