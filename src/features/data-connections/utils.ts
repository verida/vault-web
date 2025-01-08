import { isDate } from "date-fns"

import { commonConfig } from "@/config/common"
import { DEFAULT_DATA_PROVIDER_DESCRIPTION } from "@/features/data-connections/constants"
import {
  DataConnectionsApiV1DisconnectConnectionResponseSchema,
  DataConnectionsApiV1GetConnectionsResponseSchema,
  DataConnectionsApiV1GetProvidersResponseSchema,
  DataConnectionsApiV1SyncAllConnectionsResponseSchema,
  DataConnectionsApiV1SyncConnectionResponseSchema,
} from "@/features/data-connections/schemas"
import {
  DataConnection,
  DataConnectionsApiV1DisconnectConnectionResponse,
  DataConnectionsApiV1SyncAllConnectionsResponse,
  DataConnectionsApiV1SyncConnectionResponse,
  DataProvider,
} from "@/features/data-connections/types"
import { getNewDataConnectionCallbackPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("data-connections")

/**
 * Builds a unique connection ID by combining the provider ID and account ID.
 *
 * @param {Object} params - The parameters for building the connection ID.
 * @param {string} params.providerId - The ID of the data provider.
 * @param {string} params.accountId - The ID of the user account.
 * @returns {string} A unique connection ID in the format "providerId:accountId".
 */
export function buildConnectionId({
  providerId,
  accountId,
}: {
  providerId: string
  accountId: string
}): string {
  return `${providerId}:${accountId}`
}

/**
 * Builds a unique connection handler ID by combining the provider ID, account ID, and handler ID.
 *
 * @param {Object} params - The parameters for building the connection handler ID.
 * @param {string} params.providerId - The ID of the data provider.
 * @param {string} params.accountId - The ID of the user account.
 * @param {string} params.handlerId - The ID of the data provider handler.
 * @returns {string} A unique connection handler ID in the format "providerId:accountId:handlerId".
 */
export function buildConnectionHandlerId({
  providerId,
  accountId,
  handlerId,
}: {
  providerId: string
  accountId: string
  handlerId: string
}): string {
  return `${buildConnectionId({ providerId, accountId })}:${handlerId}`
}

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
    logger.warn("Cannot get data providers due to incorrect API configuration")
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    logger.debug("Sending API request to fetch data providers")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/providers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()
    logger.debug("Received response from providers API")

    // Validate the API response against the expected schema
    const validatedData =
      DataConnectionsApiV1GetProvidersResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully fetched data providers")

    // Map the validated data to DataProvider objects, ensuring each has a description
    const providers: DataProvider[] = validatedData.items.map((provider) => ({
      ...provider,
      description: provider.description || DEFAULT_DATA_PROVIDER_DESCRIPTION,
    }))

    // Sort the providers by label
    return providers
      .filter((provider) => provider.id !== "mock")
      .filter(
        (provider) =>
          // For now, explicitely accepting active and upcoming providers
          // But we'll need to update in case of additional statuses
          provider.status === "active" || provider.status === "upcoming"
      )
      .sort((a, b) => {
        // Sort by status first (active before upcoming)
        if (a.status !== b.status) {
          return a.status === "active" ? -1 : 1
        }
        // Then sort by label
        return a.label.localeCompare(b.label)
      })
  } catch (error) {
    throw new Error("Error fetching data providers", { cause: error })
  }
}

/**
 * Fetches data connections from the API or returns mock data if the API is not configured.
 *
 * @param sessionToken - The session token for authentication
 * @returns A promise that resolves to an array of DataConnection
 * @throws Error if there's an issue fetching the data connections
 */
export async function getDataConnections(
  sessionToken: string
): Promise<DataConnection[]> {
  logger.info("Fetching data connections")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot get data connections due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  try {
    logger.debug("Sending API request to fetch data connections")
    const response = await fetch(
      `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/connections`,
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
    logger.debug("Received response from data connections API")

    // Validate the API response against the expected schema
    const validatedData =
      DataConnectionsApiV1GetConnectionsResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully fetched data connections")

    return Object.values(validatedData.items)
  } catch (error) {
    throw new Error("Error fetching data connections", { cause: error })
  }
}

/**
 * Sync\ a given data connection
 *
 * @param connectionId - The connection ID
 * @param sessionToken - The session token for authentication
 * @throws Error if there's an issue syncing the data connection
 */
export async function syncDataConnection(
  connectionId: string,
  sessionToken: string
): Promise<DataConnectionsApiV1SyncConnectionResponse> {
  logger.info("Syncing data connection", { connectionId })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot sync data connection due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  const url = new URL(
    `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/connections/${connectionId}/sync`
  )

  try {
    logger.debug("Sending API request to sync data connection")
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
      body: JSON.stringify({
        instantComplete: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    // Assuming the API doesn't return any meaningful data on success
    const data = await response.json()

    const validatedData =
      DataConnectionsApiV1SyncConnectionResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully synced data connection", {
      connectionId,
    })

    return validatedData
  } catch (error) {
    throw new Error("Error syncing data connection", { cause: error })
  }
}

/**
 * Sync all data connections
 *
 * @param sessionToken - The session token for authentication
 * @returns A promise that resolves to a DataConnectionsApiV1SyncAllConnectionsResponse indicating success
 * @throws Error if there's an issue syncing all data connections
 */
export async function syncAllDataConnections(
  sessionToken: string
): Promise<DataConnectionsApiV1SyncAllConnectionsResponse> {
  logger.info("Syncing all data connections")

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot sync data connection due to incorrect API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  const url = new URL(
    `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/connections/sync`
  )

  try {
    logger.debug("Sending API request to sync data connection")
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": sessionToken,
      },
      body: JSON.stringify({
        instantComplete: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()

    const validatedData =
      DataConnectionsApiV1SyncAllConnectionsResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully synced all data connections")

    return validatedData
  } catch (error) {
    throw new Error("Error syncing all data connections", { cause: error })
  }
}

/**
 * Disconnect a give data connection
 *
 * @param connectionId - The connection ID
 * @param sessionToken - The session token for authentication
 * @returns A promise that resolves to a DataConnectionDisconnectApiResponse indicating success
 * @throws Error if there's an issue disconnecting the data connection
 */
export async function disconnectDataConnection(
  connectionId: string,
  sessionToken: string
): Promise<DataConnectionsApiV1DisconnectConnectionResponse> {
  logger.info("Disconnecting data connection", {
    connectionId,
  })

  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    logger.warn(
      "Cannot disconnect data connection due to incorrect Private Data API configuration"
    )
    throw new Error("Incorrect Private Data API configuration")
  }

  const url = new URL(
    `${commonConfig.PRIVATE_DATA_API_BASE_URL}/api/rest/v1/connections/${connectionId}`
  )

  try {
    logger.debug("Sending API request to disconnect data connection")
    const response = await fetch(url.toString(), {
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
    const validatedData =
      DataConnectionsApiV1DisconnectConnectionResponseSchema.parse(data)

    if (!validatedData.success) {
      throw new Error("API returned unsuccessful operation")
    }

    logger.info("Successfully disconnected data connection", {
      connectionId,
    })

    return validatedData
  } catch (error) {
    throw new Error("Error disconnecting data connection", { cause: error })
  }
}

/**
 * Builds the URL to connect to a given provider.
 *
 * @param providerId - The provider ID
 * @param sessionToken - The session token for authentication
 * @returns The URL string for connecting to the provider
 * @throws Error if the API configuration is missing
 */
export function buildConnectProviderUrl(
  providerId: string,
  sessionToken: string
): string {
  if (!commonConfig.PRIVATE_DATA_API_BASE_URL) {
    throw new Error("Incorrect Private Data API configuration")
  }

  // The connection will actually be driven by the Private Data server.
  // The Vault web app will open a new tab with the URL returned by this
  // function. Once the connection is established, the Private Data server will
  // redirect back to the Vault app as set in the `redirect` search param.
  const connectUrl = new URL(
    `${commonConfig.PRIVATE_DATA_API_BASE_URL}/providers/${providerId}/connect`
  )
  connectUrl.searchParams.append("api_key", sessionToken)

  const redirectUrl = new URL(
    `${commonConfig.BASE_URL}${getNewDataConnectionCallbackPageRoute()}`
  )

  // Redirecting to the connections summary page
  connectUrl.searchParams.append("redirect", redirectUrl.toString())

  return connectUrl.toString()
}

/**
 * Gets the latest sync end date from a data connection
 *
 * @param connection - The data connection
 * @returns The latest sync end date
 */
export function getDataConnectionLatestSyncEnd(
  connection: DataConnection
): Date | undefined {
  return connection.handlers.reduce((latest: Date | undefined, handler) => {
    if (!handler.latestSyncEnd) {
      return latest
    }

    const latestSyncEndDate = new Date(handler.latestSyncEnd)
    if (!isDate(latestSyncEndDate)) {
      return latest
    }

    if (!latest) {
      return latestSyncEndDate
    }

    return latestSyncEndDate.getTime() > latest.getTime()
      ? latestSyncEndDate
      : latest
  }, undefined)
}

export function getDataConnectionsLatestSyncEnd(
  connections: DataConnection[]
): Date | undefined {
  return connections.reduce((latest: Date | undefined, connection) => {
    const latestSyncEndDate = getDataConnectionLatestSyncEnd(connection)
    if (!latestSyncEndDate) {
      return latest
    }

    if (!latest) {
      return latestSyncEndDate
    }

    return latestSyncEndDate.getTime() > latest.getTime()
      ? latestSyncEndDate
      : latest
  }, undefined)
}
