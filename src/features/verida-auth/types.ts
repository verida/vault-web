import { z } from "zod"

import { VeridaAuthAuthV1ResponseSchema } from "@/features/verida-auth/schemas"

export type VeridaAuthScopeType = "data" | "api" | "unknown"

export type VeridaAuthScopePermission = "read" | "write" | "delete" | "unknown"

export type VeridaAuthScope = {
  id?: string
  type: VeridaAuthScopeType
  name?: string
  description?: string
  permissions?: VeridaAuthScopePermission[]
  uri?: string
}

export type VeridaAuthRequestPayload = {
  appDID: string
  scopes: string[]
  redirectUrl: string
  state?: string
}

export type ValidVeridaAuthRequest = {
  status: "valid"
  payload: VeridaAuthRequestPayload
}

export type InvalidVeridaAuthRequest = {
  status: "invalid"
  errorDescription: string
}

export type VeridaAuthRequest =
  | ValidVeridaAuthRequest
  | InvalidVeridaAuthRequest

export type VeridaAuthAuthorizationRequestObject = {
  appDID: string
  userDID: string
  scopes: string[]
  timestamp: number
}

export type VeridaAuthApiV1RequestBody = {
  client_id: string
  auth_request: string // Stringified version of VeridaAuthAuthRequest
  redirect_uri: string
  user_sig: string
  state: string
}

export type VeridaAuthAuthV1Response = z.infer<
  typeof VeridaAuthAuthV1ResponseSchema
>
