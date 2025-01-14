import { z } from "zod"

import { UserAiProfileParamsSchema } from "@/features/user-ai-profile/schemas"

export const BaseRequestSchema = z.object({
  type: z.string(),
})

export const UserProfileApiRequestIntegrationParamsSchema = z.record(
  z.unknown()
)

export const UserProfileApiRequestSchema = BaseRequestSchema.extend({
  type: z.literal("userProfileApiRequest"),
  did: z.string().optional(),
  purpose: z.string().optional(),
  profileJsonSchema: z.string(),
  profileParams: UserAiProfileParamsSchema,
  endpointUri: z.string().url(),
  integrationParams: UserProfileApiRequestIntegrationParamsSchema.optional(),
  exposesUserData: z.boolean().default(true),
})
