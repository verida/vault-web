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

export const VeridaAuthResolvedScopePermissionSchema = z.enum(["r", "w", "d"])

export const VeridaAuthResolvedScopeSchema = z.object({
  type: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  permissions: z.array(VeridaAuthResolvedScopePermissionSchema).optional(),
  uri: z.string().optional(),
})

export const VeridaAuthResolveScopesV1ResponseSchema = z.object({
  scopes: z.array(VeridaAuthResolvedScopeSchema),
  scopeValidity: z.record(z.string(), z.boolean()),
})

export const VeridaAuthAuthV1ResponseSchema = z.object({
  redirectUrl: z.string().url(),
})
