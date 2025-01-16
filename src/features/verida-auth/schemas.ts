import { z } from "zod"

export const VeridaAuthGetScopeDefinitionsV1ResponseSchema = z.object({
  scopes: z.record(
    z.string(),
    z.object({
      type: z.string(),
      description: z.string(),
    })
  ),
})

export const VeridaAuthAuthV1ResponseSchema = z.object({
  redirectUrl: z.string().url(),
})
