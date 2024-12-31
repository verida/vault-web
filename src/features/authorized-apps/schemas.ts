import { z } from "zod"

import { VeridaOauthScopeSchema } from "@/features/verida-oauth/schemas"

export const AuthorizedAppBaseSchema = z.object({
  name: z.string(),
  url: z.string(),
  lastAccessedAt: z.string(),
  scopes: z.array(VeridaOauthScopeSchema),
})
