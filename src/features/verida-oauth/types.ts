import { z } from "zod"

import {
  VeridaOauthPayloadSchema,
  VeridaOauthScopeSchema,
} from "@/features/verida-oauth/schemas"

export type VeridaOauthScope = z.infer<typeof VeridaOauthScopeSchema>

export type VeridaOauthPayload = z.infer<typeof VeridaOauthPayloadSchema>
