import { z } from "zod"

import { VeridaRecord } from "@/features/verida-database/types"
import { VeridaInboxMessageBaseSchema } from "@/features/verida-inbox/schemas"

export type VeridaMessagingEngineStatus = "idle" | "loading" | "ready" | "error"

export type VeridaInboxMessage = z.infer<typeof VeridaInboxMessageBaseSchema>

export type VeridaInboxMessageRecord = VeridaRecord<VeridaInboxMessage>
