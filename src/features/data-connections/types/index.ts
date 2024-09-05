import { z } from "zod"

import {
  DataConnectionBaseSchema,
  DataConnectionHandlerBaseSchema,
  DataConnectionHandlerConfigSchema,
  DataConnectionHandlerStatusSchema,
  DataConnectionStatusSchema,
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
