import { z } from "zod"

// TODO: Finalise the schema
export const DataProviderHandlerSchema = z.object({
  name: z.string(),
  label: z.string(),
  // type: z.enum(["enumMulti", "enum"]),
  defaultValue: z.string().optional(),
})

// TODO: Finalise the schema
export const DataProviderSchema = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string().url(),
  description: z.string().optional(),
  handlers: z
    .record(z.string(), z.array(DataProviderHandlerSchema.passthrough()))
    .optional(),
})

export const DataProvidersResponseSchema = z.record(
  z.string(),
  DataProviderSchema.passthrough()
)
