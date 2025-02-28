import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"
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

export const VeridaAuthTokenBaseSchema = z.object({
  appDID: z.string().optional(),
  scopes: z.array(z.string()),
})

export const VeridaAuthTokenRecordSchema = VeridaBaseRecordSchema.extend(
  VeridaAuthTokenBaseSchema.shape
)

export const VeridaAuthGetTokensApiV1ResponseSchema = z.object({
  tokens: z.array(VeridaAuthTokenRecordSchema),
})

export const VeridaAuthGetTokenApiV1ResponseSchema = z.object({
  token: VeridaAuthTokenRecordSchema,
})

export const VeridaAuthRevokeTokenApiV1ResponseSchema = z.object({
  revoked: z.boolean(),
})

export const VeridaAuthCreateTokenApiV1ResponseSchema = z.object({
  token: z.string(),
})
