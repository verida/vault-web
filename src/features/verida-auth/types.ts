import { z } from "zod"

import { VeridaOauthAuthV1ResponseSchema } from "@/features/verida-auth/schemas"

export type VeridaOauthScopeType = "data" | "api" | "unknown"

export type VeridaOauthScope = {
  id: string
  type: VeridaOauthScopeType
  description: string
}

export type VeridaOauthRequestPayload = {
  appDID: string | null
  scopes: string[]
  redirectUrl: string
}

export type VeridaOauthRequest =
  | {
      status: "valid"
      payload: VeridaOauthRequestPayload
    }
  | {
      status: "invalid"
      payload: null
    }

export type VeridaAuthRequestPayload = {
  appDID?: string
  userDID: string
  scopes: string[]
  timestamp: number
}

export type VeridaAuthApiV1RequestBody = {
  client_id: string
  // auth_request: VeridaAuthRequestPayload
  auth_request: string
  redirect_uri: string
  user_sig: string
  state: string
}

export type VeridaOauthAuthV1Response = z.infer<
  typeof VeridaOauthAuthV1ResponseSchema
>
