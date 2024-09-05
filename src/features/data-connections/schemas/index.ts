import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida"

// TODO: Finalise the schema
export const DataConnectionsOptionDefinitionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(), // TODO: Set up enum of types
  // TODO: Add options for different types
  defaultValue: z.string().optional(),
})

export const DataProviderHandlerDefinitionSchema = z.object({
  id: z.string(),
  label: z.string(),
  options: z
    .array(DataConnectionsOptionDefinitionSchema.passthrough())
    .optional(),
})

export const DataProviderSchema = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string().url(),
  description: z.string().optional(),
  options: z
    .array(DataConnectionsOptionDefinitionSchema.passthrough())
    .optional(),
  handlers: z
    .array(DataProviderHandlerDefinitionSchema.passthrough())
    .optional(),
})

export const DataProvidersResponseSchema = z.array(
  DataProviderSchema.passthrough()
)

export const DataConnectionProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.object({
    uri: z.string().url(),
  }),
  givenName: z.string(),
  familyName: z.string(),
  email: z.string().email(),
})

// TODO: Finalise schema
export const DataConnectionStatusSchema = z.enum([
  "connected",
  "error",
  "paused",
  // "sync-active",
  "active",
])

export const DataConnectionBaseSchema = z.object({
  name: z.string(),
  provider: z.string(),
  providerId: z.string(),
  profile: DataConnectionProfileSchema.passthrough(),
  syncStatus: DataConnectionStatusSchema,
  syncFrequency: z.string(),
  syncStart: z.string().datetime(),
  syncEnd: z.string().datetime(),
})

export const DataConnectionHandlerConfigSchema = z.object({
  name: z.string(),
  enabled: z.boolean(),
  config: z.record(z.string(), z.string()),
})

export const DataConnectionRecordSchema = VeridaBaseRecordSchema.partial()
  .extend(DataConnectionBaseSchema.passthrough().shape)
  .extend({
    handlers: z.array(DataConnectionHandlerConfigSchema.passthrough()),
  })

export const DataConnectionHandlerStatusSchema = z.enum([
  "enabled",
  "disabled",
  "error",
  "syncing",
])

export const DataConnectionHandlerBaseSchema = z.object({
  providerName: z.string(),
  providerId: z.string(),
  handlerName: z.string(),
  status: DataConnectionHandlerStatusSchema,
  syncMessage: z.string().optional(),
})

export const DataConnectionHandlerRecordSchema =
  VeridaBaseRecordSchema.partial()
    .extend(DataConnectionHandlerBaseSchema.passthrough().shape)
    .extend({
      ...DataConnectionHandlerBaseSchema.passthrough().shape,
    })

export const DataConnectionSyncStatusApiResultItemSchema = z.object({
  connection: DataConnectionRecordSchema,
  handlers: z.array(DataConnectionHandlerRecordSchema),
})

export const DataConnectionSyncStatusApiResponseSchema = z.object({
  result: z.record(
    z.string(),
    DataConnectionSyncStatusApiResultItemSchema.passthrough()
  ),
  success: z.boolean(),
})

export const DataConnectionSyncApiResponseSchema = z
  .object({
    // TODO: Define the returned data connection when needed
    success: z.boolean(),
  })
  .passthrough()
