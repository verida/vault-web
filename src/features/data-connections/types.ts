import { z } from "zod"

import {
  DataConnectionConfigOptionSchema,
  DataConnectionHandlerSchema,
  DataConnectionHandlerStatusSchema,
  DataConnectionSchema,
  DataConnectionStatusSchema,
  DataConnectionSyncLogBaseSchema,
  DataConnectionSyncLogLevelSchema,
  DataConnectionsApiV1DisconnectConnectionResponseSchema,
  DataConnectionsApiV1SyncAllConnectionsResponseSchema,
  DataConnectionsApiV1SyncConnectionResponseSchema,
  DataProviderHandlerSchema,
  DataProviderSchema,
  DataProviderStatusSchema,
} from "@/features/data-connections/schemas"

// Data Connections and Providers definitions

export type DataProviderStatus = z.infer<typeof DataProviderStatusSchema>

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

export type DataConnectionsApiV1SyncAllConnectionsResponse = z.infer<
  typeof DataConnectionsApiV1SyncAllConnectionsResponseSchema
>

export type DataConnectionsApiV1SyncConnectionResponse = z.infer<
  typeof DataConnectionsApiV1SyncConnectionResponseSchema
>

export type DataConnectionsApiV1DisconnectConnectionResponse = z.infer<
  typeof DataConnectionsApiV1DisconnectConnectionResponseSchema
>

export type DataConnectionSyncLogLevel = z.infer<
  typeof DataConnectionSyncLogLevelSchema
>

export type DataConnectionSyncLog = z.infer<
  typeof DataConnectionSyncLogBaseSchema
>

// BroadcastChannel types

type NewDataConnectionEvent = {
  type: "new-data-connection"
  payload: { connectionId?: string } // TODO: Make connectionId required when available
}

export type DataConnectionsChannelEvent = NewDataConnectionEvent
