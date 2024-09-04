import { z } from "zod"

export const DataConnectionsOptionsSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  defaultValue: z.string().optional(),
})

// TODO: Finalise the schema
export const DataProviderHandlerSchema = z.object({
  id: z.string(),
  label: z.string(),
  options: z.array(DataConnectionsOptionsSchema.passthrough()).optional(),
})

// TODO: Finalise the schema
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
