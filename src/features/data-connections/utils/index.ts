import { commonConfig } from "@/config/common"
import { DEFAULT_DATA_PROVIDER_DESCRIPTION } from "@/features/data-connections/constants"
import {
  MOCK_DATA_PROVIDERS,
  MOCK_USER_DATA_CONNECTIONS,
} from "@/features/data-connections/mock"
import {
  DataConnectionDisconnectApiResponseSchema,
  DataConnectionSyncApiResponseSchema,
  DataConnectionSyncStatusApiResponseSchema,
  DataProvidersResponseSchema,
} from "@/features/data-connections/schemas"
import {
  DataConnection,
  DataConnectionSyncApiResponse,
  DataProvider,
} from "@/features/data-connections/types"
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
    const providers: DataProvider[] = validatedData.map((provider) => ({
      ...provider,
      description: provider.description || DEFAULT_DATA_PROVIDER_DESCRIPTION,
    }))

    // Sort the providers by label
    providers.sort((a, b) => a.label.localeCompare(b.label))

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
/**
 * Fetches data connections from the API or returns mock data if the API is not configured.
 *
 * @param key - The API key for authentication
 * @returns A promise that resolves to an array of DataConnection
 * @throws Error if there's an issue fetching the data connections
 */
export async function getDataConnections(
  key?: string
): Promise<DataConnection[]> {
  logger.info("Fetching data connections")

  // Use mock response if API configuration is missing or key is not provided
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
    logger.warn("Using mock response due to missing API configuration or key")
    return mockGetDataConnections()
  }

  try {
    logger.debug("Sending request to sync status API")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/sync/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "key": key,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Received response from sync status API")

    // Validate the API response against the expected schema
    const validatedData = DataConnectionSyncStatusApiResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful response")
    }

    logger.info("Successfully fetched data connections")
    const dataConnections: DataConnection[] = Object.values(
      validatedData.result
    ).map((connectionItem) => ({
      ...connectionItem.connection,
      handlers: connectionItem.handlers.reduce(
        (formattedHandlers, handler) => {
          const connectionHandler = connectionItem.connection.handlers.find(
            (h) => h.name === handler.handlerName
          )
          if (connectionHandler) {
            formattedHandlers.push({
              ...connectionHandler,
              status: handler.status,
              syncMessage: handler.syncMessage,
            })
          }
          return formattedHandlers
        },
        [] as DataConnection["handlers"]
      ),
    }))
    return dataConnections
  } catch (error) {
    throw new Error("Error fetching data connections", { cause: error })
  }
}

/**
 * Simulates fetching data connections for testing purposes.
 *
 * @returns A promise that resolves to an array of mock DataConnection objects
 */
async function mockGetDataConnections(): Promise<DataConnection[]> {
  // Simulate API delay
  await wait(5000)

  return Promise.resolve(MOCK_USER_DATA_CONNECTIONS)
}

/**
 * Syncs a data connection with the specified providerId and accountId.
 *
 * @param providerId - The provider name
 * @param accountId - The account ID
 * @param key - The API key for authentication
 * @throws Error if there's an issue syncing the data connection
 */
export async function syncDataConnection(
  providerId: string,
  accountId: string,
  key?: string
): Promise<DataConnectionSyncApiResponse> {
  logger.info("Syncing data connection", { providerId })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
    logger.warn("Cannot sync data connection: missing API configuration or key")
    throw new Error("Missing API configuration")
  }

  const url = new URL(`${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/sync`)
  url.searchParams.append("provider", providerId)
  url.searchParams.append("providerId", accountId)

  try {
    logger.debug("Sending request to sync API")
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "key": key,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Assuming the API doesn't return any meaningful data on success
    const data = await response.json()

    const validatedData = DataConnectionSyncApiResponseSchema.parse(data)

    logger.info("Successfully synced data connection", {
      providerId,
    })

    return validatedData
  } catch (error) {
    throw new Error("Error syncing data connection", { cause: error })
  }
}

/**
 * Disconnects a data connection for the specified providerId and accountId.
 *
 * @param providerId - The provider ID
 * @param accountId - The account ID
 * @param key - The API key for authentication
 * @returns A promise that resolves to a boolean indicating success
 * @throws Error if there's an issue disconnecting the data connection
 */
export async function disconnectDataConnection(
  providerId: string,
  accountId: string,
  key?: string
): Promise<boolean> {
  logger.info("Disconnecting data connection", {
    provider: providerId,
  })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL || !key) {
    logger.warn(
      "Cannot disconnect data connection: missing API configuration or key"
    )
    throw new Error("Missing API configuration")
  }

  const url = new URL(
    `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/v1/provider/disconnect/${providerId}`
  )
  url.searchParams.append("providerId", accountId)

  try {
    logger.debug("Sending request to disconnect API")
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "key": key,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const validatedData = DataConnectionDisconnectApiResponseSchema.parse(data)

    logger.info("Successfully disconnected data connection", {
      provider: providerId,
      providerId: accountId,
    })

    return validatedData.success
  } catch (error) {
    throw new Error("Error disconnecting data connection", { cause: error })
  }
}
