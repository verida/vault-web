import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida"

// TODO: Finalise the schema
export const DataConnectionsOptionsSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(), // TODO: Set up enum of types
  // TODO: Add options for different types
  defaultValue: z.string().optional(),
})

export const DataProviderHandlerSchema = z.object({
  id: z.string(),
  label: z.string(),
  options: z.array(DataConnectionsOptionsSchema.passthrough()).optional(),
})

export const DataProviderSchema = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string().url(),
  description: z.string().optional(),
  options: z.array(DataConnectionsOptionsSchema.passthrough()).optional(),
  handlers: z.array(DataProviderHandlerSchema.passthrough()).optional(),
})

export const DataProvidersResponseSchema = z.array(
  DataProviderSchema.passthrough()
)

// TODO: Finalise the schema
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

// TODO: Finalise the schema
export const DataConnectionBaseSchema = z.object({
  name: z.string(),
  provider: z.string(),
  providerId: z.string(),
  profile: DataConnectionProfileSchema.passthrough(),
  syncStatus: z.string(),
  syncFrequency: z.string(),
  syncStart: z.string().datetime(),
  syncEnd: z.string().datetime(),
})

// TODO: Finalise the schema
export const DataConnectionRecordSchema = VeridaBaseRecordSchema.extend(
  DataConnectionBaseSchema.passthrough().shape
)

// TODO: Finalise the schema
export const DataConnectionHandlerBaseSchema = z.object({
  providerName: z.string(),
  providerId: z.string(),
  handlerName: z.string(),
  status: z.string(),
  syncMessage: z.string(),
})

// TODO: Finalise the schema
export const DataConnectionHandlerRecordSchema = VeridaBaseRecordSchema.extend(
  DataConnectionHandlerBaseSchema.passthrough().shape
)

// TODO: Finalise the schema
export const DataConnectionSyncStatusApiResultItemSchema = z.object({
  connection: DataConnectionRecordSchema,
  // TODO: Add the handlers when needed
  // handlers: z.array(DataConnectionHandlerRecordSchema),
})

// TODO: Finalise the schema
export const DataConnectionSyncStatusApiResponseSchema = z.object({
  result: z.record(
    z.string(),
    DataConnectionSyncStatusApiResultItemSchema.passthrough()
  ),
  success: z.boolean(),
})
