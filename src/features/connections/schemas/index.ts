import { z } from "zod"

// TODO: Finalise the schema
export const ProviderHandlerSchema = z.object({
  name: z.string(),
  label: z.string(),
  // type: z.enum(["enumMulti", "enum"]),
  defaultValue: z.string().optional(),
})

// TODO: Finalise the schema
export const ProviderSchema = z.object({
  name: z.string(),
  label: z.string(),
  icon: z.string().url(),
  description: z.string().optional(),
  handlers: z
    .record(z.string(), ProviderHandlerSchema.passthrough())
    .optional(),
})

export const ProvidersResponseSchema = z.record(
  z.string(),
  ProviderSchema.passthrough()
)
