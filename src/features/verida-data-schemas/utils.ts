import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import { VeridaDataSchemaSchema } from "@/features/verida-data-schemas/schemas"
import { VeridaDataSchema } from "@/features/verida-data-schemas/types"

const logger = Logger.create("verida-data-schemas")

/**
 * Fetches and validates a JSON schema from a given URL.
 *
 * This function performs the following steps:
 * 1. Validates the provided URL format
 * 2. Fetches the schema from the URL
 * 3. Validates the schema against the VeridaDataSchemaSchema
 *
 * @param schemaUrl - The URL from which to fetch the JSON schema
 * @returns Promise resolving to a validated BasicVeridaDataSchema
 * @throws Error if URL is invalid, fetch fails, or schema validation fails
 */
export async function fetchJsonDataSchema(
  schemaUrl: string
): Promise<VeridaDataSchema> {
  logger.info("Fetching JSON schema", { schemaUrl })

  try {
    const schemaUrlValidationResult = z.string().url().safeParse(schemaUrl)
    if (!schemaUrlValidationResult.success) {
      throw new Error("Invalid schema URL")
    }
    const validatedSchemaUrl = schemaUrlValidationResult.data

    const response = await fetch(validatedSchemaUrl, { method: "GET" })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const rawDataSchema = await response.json()

    const validatedSchema = VeridaDataSchemaSchema.parse(rawDataSchema)

    logger.info("Successfully fetched JSON schema", {
      schemaUrl,
    })

    return validatedSchema as VeridaDataSchema
  } catch (error) {
    throw new Error("Failed to fetch JSON schema", { cause: error })
  }
}
