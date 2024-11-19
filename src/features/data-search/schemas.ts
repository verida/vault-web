import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"
import { filteredArraySchema } from "@/utils/schemas"

const logger = Logger.create("search-data")

const SEARCH_TYPES = [
  "files",
  "messages",
  "emails",
  "favorites",
  "followed_pages",
  "posts",
  "calendar",
] as const

export const SearchTypeSchema = z.enum(SEARCH_TYPES)

export const UniversalSearchV1ApiResponseSchema = z.object({
  items: filteredArraySchema(VeridaBaseRecordSchema, logger),
})
