import { z } from "zod"

import { UserAiProfileParamsSchema } from "@/features/user-ai-profile/schemas"

export const BaseRequestSchema = z.object({
  type: z.string(),
})

export const UserProfileApiRequestEndpointParamsSchema = z.record(z.unknown())

export const UserProfileApiRequestSchema = BaseRequestSchema.extend({
  type: z.literal("userProfileApiRequest"),
  did: z.string().optional(),
  purpose: z.string().optional(),
  profileJsonSchemaUrl: z.string().url(),
  profileParams: UserAiProfileParamsSchema,
  endpointUrl: z.string().url(),
  endpointParams: UserProfileApiRequestEndpointParamsSchema.optional(),
  exposesUserData: z.boolean().default(true),
})
