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

// Data Connections and Providers definitions

export type DataProvider = z.infer<typeof DataProviderSchema>

export type DataProviderHandlerDefinition = z.infer<
  typeof DataProviderHandlerDefinitionSchema
>

export type DataConnectionsOptionDefinition = z.infer<
  typeof DataConnectionsOptionDefinitionSchema
>

// Data Connections instances

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

// TODO: Infer from a zod schema
export type DataConnectionSyncLogLevel = "debug" | "info" | "error" | "warning"

// TODO: Infer from a zod schema
export type DataConnectionSyncLog = {
  providerName: string
  providerId: string
  handlerName?: string
  level: DataConnectionSyncLogLevel
  message: string
  insertedAt: string
}

// BroadcastChannel types

type NewDataConnectionEvent = {
  type: "new-data-connection"
  payload: { connectionId?: string } // TODO: Make connectionId required when available
}

export type DataConnectionsChannelEvent = NewDataConnectionEvent
