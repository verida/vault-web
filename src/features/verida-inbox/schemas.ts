import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import { VeridaBaseRecordSchema } from "@/features/verida-database/schemas"
import { filteredArraySchema } from "@/utils/schemas"

const logger = Logger.create("verida-inbox")

// Known message type schemas
export const VeridaInboxMessageTypeMessageDataSchema = z.object({
  subject: z.string(),
  message: z.string(),
  link: z
    .object({
      url: z.string().optional(),
      text: z.string().optional(),
    })
    .optional(),
  replyId: z.string().optional(),
})

export const VeridaInboxMessageTypeDataSendDataSchema = z.object({
  status: z
    .union([z.literal("accept"), z.literal("reject"), z.string()])
    .optional(),
  replyId: z.string().optional(),
  data: z.array(z.unknown()),
})

export const VeridaInboxMessageTypeDataRequestDataSchema = z.object({
  status: z
    .union([z.literal("accept"), z.literal("reject"), z.string()])
    .optional(),
})

// Combine into final schema that can be extended
export const VeridaInboxMessageBaseSchema = z.object({
  message: z.string(),
  sentAt: z.string(),
  sentBy: z.object({
    did: z.string(),
    context: z.string(),
  }),
  read: z.boolean(),
  type: z.string(),
  data: z.unknown(),
})

export const VeridaInboxMessageRecordSchema = VeridaBaseRecordSchema.merge(
  VeridaInboxMessageBaseSchema
)

export const VeridaInboxMessageRecordArraySchema = filteredArraySchema(
  VeridaInboxMessageRecordSchema,
  logger
)
