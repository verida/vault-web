import { z } from "zod"

import {
  DataConnectionConfigOptionSchema,
  DataConnectionHandlerSchema,
  DataConnectionHandlerStatusSchema,
  DataConnectionSchema,
  DataConnectionStatusSchema,
  DataConnectionsApiV1DisconnectConnectionResponseSchema,
  DataConnectionsApiV1SyncConnectionResponseSchema,
  DataProviderHandlerSchema,
  DataProviderSchema,
} from "@/features/data-connections/schemas"

// Data Connections and Providers definitions

export type DataProvider = z.infer<typeof DataProviderSchema>

export type DataProviderHandler = z.infer<typeof DataProviderHandlerSchema>

export type DataConnectionConfigOption = z.infer<
  typeof DataConnectionConfigOptionSchema
>

// Data Connections instances

export type DataConnection = z.infer<typeof DataConnectionSchema>

export type DataConnectionStatus = z.infer<typeof DataConnectionStatusSchema>

export type DataConnectionHandler = z.infer<typeof DataConnectionHandlerSchema>

export type DataConnectionHandlerStatus = z.infer<
  typeof DataConnectionHandlerStatusSchema
>

export type DataConnectionsApiV1SyncConnectionResponse = z.infer<
  typeof DataConnectionsApiV1SyncConnectionResponseSchema
>

export type DataConnectionsApiV1DisconnectConnectionResponse = z.infer<
  typeof DataConnectionsApiV1DisconnectConnectionResponseSchema
>

// TODO: Infer from a zod schema
export type DataConnectionSyncLogLevel = "debug" | "info" | "error" | "warning"

// TODO: Infer from a zod schema
export type DataConnectionSyncLog = {
  providerId: string
  accountId: string
  handlerId?: string
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
