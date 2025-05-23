import { z } from "zod"

import {
  VeridaAuthAuthV1ResponseSchema,
  VeridaAuthRequestPayerSchema,
  VeridaAuthTokenBaseSchema,
  VeridaAuthTokenRecordSchema,
} from "@/features/verida-auth/schemas"

export type VeridaAuthPayer = z.infer<typeof VeridaAuthRequestPayerSchema>

export type VeridaAuthScopeType = "data" | "api" | "unknown"

export type VeridaAuthScopePermission = "read" | "write" | "delete" | "unknown"

export type VeridaAuthScope = {
  id?: string
  type: VeridaAuthScopeType
  name?: string
  namePlural?: string
  description?: string
  permissions?: VeridaAuthScopePermission[]
  uri?: string
}

export type VeridaAuthRequestPayload = {
  appDID: string
  payer: VeridaAuthPayer
  scopes: string[]
  redirectUrl: string
  state?: string
}

export type ProcessingVeridaAuthRequest = {
  status: "processing"
}

export type ErrorVeridaAuthRequest = {
  status: "error"
  errorDescription?: string
  redirectUrl: string | null
  state?: string
}

export type ValidVeridaAuthRequest = {
  status: "valid"
  payload: VeridaAuthRequestPayload
  ignoredScopes: string[]
  resolvedValidScopes: VeridaAuthScope[]
}

export type InvalidVeridaAuthRequest = {
  status: "invalid"
  errorDescription: string
  redirectUrl: string | null
  state?: string
}

export type VeridaAuthRequest =
  | ProcessingVeridaAuthRequest
  | ErrorVeridaAuthRequest
  | ValidVeridaAuthRequest
  | InvalidVeridaAuthRequest

export type VeridaAuthAuthorizationRequestObject = {
  appDID: string
  userDID: string
  scopes: string[]
  payer: string
  timestamp: number
}

export type VeridaAuthApiV1RequestBody = {
  client_id: string
  auth_request: string // Stringified version of VeridaAuthAuthorizationRequestObject
  redirect_uri: string
  user_sig: string
  state: string
}

export type VeridaAuthAuthV1Response = z.infer<
  typeof VeridaAuthAuthV1ResponseSchema
>

export type VeridaAuthTokenBase = z.infer<typeof VeridaAuthTokenBaseSchema>

export type VeridaAuthToken = z.infer<typeof VeridaAuthTokenRecordSchema>
