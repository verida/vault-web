import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export const VeridaInboxQueryKeys = {
  invalidateInbox: () => ["inbox"],
  unreadMessagesCount: ({ did }: { did: string | null }) => [
    "inbox",
    "unreadMessageCount",
    did,
  ],
  invalidateUnreadMessagesCount: () => ["inbox", "unreadMessageCount"],
  inboxMessages: ({
    did,
    filter,
    options,
  }: {
    did: string | null
    filter?: VeridaDatabaseQueryFilter<VeridaInboxMessageRecord>
    options?: VeridaDatabaseQueryOptions<VeridaInboxMessageRecord>
  }) => ["inbox", "messages", did, filter, options],
  invalidateInboxMessages: () => ["inbox", "messages"],
  inboxMessage: ({
    did,
    messageRecordId,
  }: {
    did: string | null
    messageRecordId: string
  }) => ["inbox", "message", did, messageRecordId],
  invalidateInboxMessage: ({
    did,
    messageRecordId,
  }: {
    did: string | null
    messageRecordId: string
  }) => ["inbox", "message", did, messageRecordId],
}
