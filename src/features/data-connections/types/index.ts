import { z } from "zod"

import {
  DataConnectionBaseSchema,
  DataConnectionDisconnectApiResponseSchema,
  DataConnectionHandlerBaseSchema,
  DataConnectionHandlerConfigSchema,
  DataConnectionHandlerStatusSchema,
  DataConnectionStatusSchema,
  DataConnectionSyncApiResponseSchema,
  DataConnectionSyncStatusApiResultItemSchema,
  DataConnectionsOptionDefinitionSchema,
  DataProviderHandlerDefinitionSchema,
  DataProviderSchema,
} from "@/features/data-connections/schemas"

export type DataProvider = z.infer<typeof DataProviderSchema>

export type DataProviderHandlerDefinition = z.infer<
  typeof DataProviderHandlerDefinitionSchema
>

export type DataConnectionsOptionDefinition = z.infer<
  typeof DataConnectionsOptionDefinitionSchema
>

export type DataConnectionBase = z.infer<typeof DataConnectionBaseSchema>

export type DataConnection = DataConnectionBase & {
  handlers: DataConnectionHandler[]
}

export type DataConnectionStatus = z.infer<typeof DataConnectionStatusSchema>

export type DataConnectionHandlerConfig = z.infer<
  typeof DataConnectionHandlerConfigSchema
>

export type DataConnectionHandlerBase = z.infer<
  typeof DataConnectionHandlerBaseSchema
>

export type DataConnectionHandler = DataConnectionHandlerConfig &
  Omit<DataConnectionHandlerBase, "providerName" | "providerId" | "handlerName">

export type DataConnectionHandlerStatus = z.infer<
  typeof DataConnectionHandlerStatusSchema
>

export type DataConnectionSyncStatus = z.infer<
  typeof DataConnectionSyncStatusApiResultItemSchema
>

export type DataConnectionSyncApiResponse = z.infer<
  typeof DataConnectionSyncApiResponseSchema
>

export type DataConnectionDisconnectApiResponse = z.infer<
  typeof DataConnectionDisconnectApiResponseSchema
>

/**
 * @deprecated
 */
export type DataConnectionLog = {
  source: string
  type: string
  id: number
  message: string
  timestamp: string
}

// BroadcastChannel types

type NewDataConnectionEvent = {
  type: "new-data-connection"
  payload: { connectionId?: string } // TODO: Make connectionId required when available
}

export type DataConnectionsChannelEvent = NewDataConnectionEvent
