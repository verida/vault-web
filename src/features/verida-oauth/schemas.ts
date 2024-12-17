import { z } from "zod"

export const VeridaOauthScopeSchema = z.object({
  database: z.string(),
  operation: z.enum(["read", "write"]),
})

export const VeridaOauthPayloadSchema = z.object({
  name: z.string(),
  url: z
    .string()
    .url()
    .transform((url) => new URL(url)),
  scopes: z.array(VeridaOauthScopeSchema),
})
