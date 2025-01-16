import { z } from "zod"

export const VeridaOauthGetScopeDefinitionsV1ResponseSchema = z.object({
  scopes: z.record(
    z.string(),
    z.object({
      type: z.string(),
      description: z.string(),
    })
  ),
})

export const VeridaOauthAuthV1ResponseSchema = z.object({
  redirectUrl: z.string().url(),
})
