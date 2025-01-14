import { z } from "zod"

import { UserProfileApiRequestSchema } from "@/features/requests/schemas"

export type UserProfileApiRequest = z.infer<typeof UserProfileApiRequestSchema>

// TODO: Add more supported requests here as a union
export type SupportedRequest = UserProfileApiRequest

export interface UserProfileApiRequestBody {
  jsonProfile: Record<string, unknown>
  jsonSchema: string
  integrationParams: Record<string, unknown>
}
