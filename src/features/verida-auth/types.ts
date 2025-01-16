import { z } from "zod"

import { VeridaAuthAuthV1ResponseSchema } from "@/features/verida-auth/schemas"

export type VeridaAuthScopeType = "data" | "api" | "unknown"

export type VeridaAuthScope = {
  id: string
  type: VeridaAuthScopeType
  description: string
}

export type VeridaAuthRequestPayload = {
  appDID: string | null
  scopes: string[]
  redirectUrl: string
}

export type VeridaAuthRequest =
  | {
      status: "valid"
      payload: VeridaAuthRequestPayload
    }
  | {
      status: "invalid"
      payload: null
    }

export type VeridaAuthAuthRequest = {
  appDID?: string
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
