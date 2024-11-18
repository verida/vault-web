import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import { filteredArraySchema } from "@/utils/schemas"

const logger = Logger.create("data-connections")

// TODO: Finalise the schema
export const DataConnectionConfigOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(), // TODO: Set up enum of types
  // TODO: Add options for different types
  defaultValue: z.string().optional(),
})

export const DataProviderHandlerSchema = z.object({
  id: z.string(),
  label: z.string(),
  options: z.array(DataConnectionConfigOptionSchema).optional(),
})

export const DataProviderSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string().url(),
  description: z.string().optional(),
  options: z.array(DataConnectionConfigOptionSchema).optional(),
  handlers: z.array(DataProviderHandlerSchema).optional(),
})

export const DataConnectionsApiV1GetProvidersResponseSchema = z.object({
  success: z.boolean(),
  items: filteredArraySchema(DataProviderSchema, logger),
})

export const DataConnectionProfileSchema = z.object({
  id: z.string(),
  readableId: z.string(),
  username: z.string().optional(),
  name: z.string(),
  avatar: z.object({
    uri: z.string().url(),
  }),
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  link: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),
  phone: z.string().optional(),
  phoneVerified: z.boolean().optional(),
  verified: z.boolean().optional(),
})

export const DataConnectionStatusSchema = z.enum([
  "connected",
  "error",
  "invalid-auth",
  "paused",
  "active",
])

export const DataConnectionHandlerStatusSchema = z.enum([
  "enabled",
  "disabled",
  "error",
  "invalid-auth",
  "syncing",
])

export const DataConnectionHandlerSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  accountId: z.string(),
  handlerId: z.string(),
  enabled: z.boolean(),
  config: z.record(z.string(), z.string()),
  status: DataConnectionHandlerStatusSchema,
  syncMessage: z.string().optional(),
  latestSyncStart: z.string().optional(),
  latestSyncEnd: z.string().optional(),
  oldestDataTimestamp: z.string().optional(),
  newestDataTimestamp: z.string().optional(),
})

export const DataConnectionSchema = z.object({
  _id: z.string(),
  providerId: z.string(),
  accountId: z.string(),
  profile: DataConnectionProfileSchema,
  syncStatus: DataConnectionStatusSchema,
  syncFrequency: z.string(),
  syncNext: z.string().optional(),
  config: z.record(z.string(), z.string()),
  handlers: z.array(DataConnectionHandlerSchema),
})

export const DataConnectionsApiV1GetConnectionsResponseSchema = z.object({
  items: z.record(z.string(), DataConnectionSchema),
  success: z.boolean(),
})

export const DataConnectionsApiV1SyncAllConnectionsResponseSchema = z.object({
  success: z.boolean(),
})

export const DataConnectionsApiV1SyncConnectionResponseSchema = z.object({
  // TODO: Define the returned data connection when needed
  success: z.boolean(),
})

export const DataConnectionsApiV1DisconnectConnectionResponseSchema = z.object({
  success: z.boolean(),
})

export const DataConnectionSyncLogLevelSchema = z.enum([
  "debug",
  "info",
  "error",
  "warning",
])

export const DataConnectionSyncLogBaseSchema = z.object({
  providerId: z.string(),
  accountId: z.string(),
  handlerId: z.string().optional(),
  level: DataConnectionSyncLogLevelSchema,
  message: z.string(),
  insertedAt: z.string(),
})
