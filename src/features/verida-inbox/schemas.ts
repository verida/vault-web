import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"
import { filteredArraySchema } from "@/utils/schemas"

const logger = Logger.create("verida-inbox")

export const VeridaInboxMessageBaseSchema = z
  .object({
    type: z.string(), // Not using the enum from the SDK as it's more open than the set values
    message: z.string(),
    sentAt: z.string(),
    sentBy: z.object({
      did: z.string(),
      context: z.string(),
    }),
    read: z.boolean(),
    data: z.unknown(),
  })
  .passthrough()

export const VeridaInboxMessageRecordSchema = VeridaBaseRecordSchema.extend(
  VeridaInboxMessageBaseSchema.shape
)

export const VeridaInboxMessageRecordArraySchema = filteredArraySchema(
  VeridaInboxMessageRecordSchema,
  logger
)
