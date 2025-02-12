import { z } from "zod"

import { isValidVeridaDid } from "@/features/verida/utils"

export const VeridaAuthRequestAppDIDSchema = z.string().refine(isValidVeridaDid)

export const VeridaAuthRequestPayerSchema = z
  .optional(z.enum(["user", "app"]))
  .default("app")

export const VeridaAuthRequestRedirectUrlSchema = z.string().url()

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
  namePlural: z.string().optional(),
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
