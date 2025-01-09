import { z } from "zod"

import { Logger } from "@/features/telemetry/logger"
import {
  VeridaBaseRecordSchema,
  VeridaBaseUnsavedRecordSchema,
} from "@/features/verida-database/schemas"
import { filteredArraySchema } from "@/utils/schemas"

const logger = Logger.create("verida-inbox")

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
  data: z.array(VeridaBaseUnsavedRecordSchema.passthrough()).optional(),
})

export const VeridaInboxMessageTypeDataRequestDataSchema = z.object({
  status: z
    .union([z.literal("accept"), z.literal("reject"), z.string()])
    .optional(),
  requestSchema: z.string().url(),
  requestedData: filteredArraySchema(VeridaBaseRecordSchema, logger).optional(),
  sharedData: filteredArraySchema(VeridaBaseRecordSchema, logger).optional(),
  userSelect: z.boolean().default(false),
  userSelectLimit: z.number().optional(),
  filter: z.record(z.string(), z.unknown()).optional(),
  fallbackAction: z
    .object({
      url: z.string().optional(),
      label: z.string().optional(),
    })
    .optional(),
})
