import { z } from "zod"

import { VeridaRecord } from "@/features/verida-database/types"
import { VeridaInboxMessageBaseSchema } from "@/features/verida-inbox/schemas"

export enum VeridaInboxMessageSupportedType {
  MESSAGE = "inbox/type/message",
  DATA_SEND = "inbox/type/dataSend",
  DATA_REQUEST = "inbox/type/dataRequest",
  // DATASTORE_SYNC = "inbox/type/datastoreSync",
}

export type VeridaMessagingEngineStatus = "idle" | "loading" | "ready" | "error"

export type VeridaMessageStatus = "accepted" | "rejected" | "pending" | null

export type VeridaInboxMessage = z.infer<typeof VeridaInboxMessageBaseSchema>

export type VeridaInboxMessageRecord = VeridaRecord<VeridaInboxMessage>
