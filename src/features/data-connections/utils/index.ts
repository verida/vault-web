import { commonConfig } from "@/config/common"
import { DEFAULT_DATA_PROVIDER_DESCRIPTION } from "@/features/data-connections/constants"
import { MOCK_DATA_PROVIDERS } from "@/features/data-connections/mock"
import { DataProvidersResponseSchema } from "@/features/data-connections/schemas"
import { DataProvider } from "@/features/data-connections/types"
import { Logger } from "@/features/telemetry"
import { wait } from "@/utils/misc"

const logger = Logger.create("DataConnections")

/**
 * Fetches data providers from the API or returns mock data if the API is not configured.
 *
 * @returns A promise that resolves to an array of DataProvider objects
 * @throws Error if there's an issue fetching the data providers
 */
export async function getDataProviders(): Promise<DataProvider[]> {
  logger.info("Fetching data providers")

  // Use mock response if API configuration is missing
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn("Using mock response due to missing API configuration")
    return mockGetDataProviders()
  }

  try {
    logger.debug("Sending request to providers API")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/providers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Received response from providers API")

    // Validate the API response against the expected schema
    const validatedData = DataProvidersResponseSchema.parse(data)
    logger.info("Successfully fetched data providers")

    // Map the validated data to DataProvider objects, ensuring each has a description
    const providers = Object.values(validatedData).map((provider) => ({
      ...provider,
      description: provider.description || DEFAULT_DATA_PROVIDER_DESCRIPTION,
    }))

    return providers
  } catch (error) {
    throw new Error("Error fetching data providers", { cause: error })
  }
}

/**
 * Simulates fetching data providers for testing purposes.
 *
 * @returns A promise that resolves to an array of mock DataProvider objects
 */
async function mockGetDataProviders(): Promise<DataProvider[]> {
  // Simulate API delay
  await wait(5000)

  // Return mock data providers with default description if not provided
  return Promise.resolve(
    MOCK_DATA_PROVIDERS.map((provider) => ({
      ...provider,
      description: provider.description || DEFAULT_DATA_PROVIDER_DESCRIPTION,
    }))
  )
}
