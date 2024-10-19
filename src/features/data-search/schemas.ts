import { z } from "zod"

import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"

const SEARCH_TYPES = [
  "files",
  "messages",
  "emails",
  "favorites",
  "followed_pages",
  "posts",
] as const

export const SearchTypeSchema = z.enum(SEARCH_TYPES)

export const UniversalSearchV1ApiResponseSchema = z.object({
  items: z.array(VeridaBaseRecordSchema),
})
