import { IMessaging } from "@verida/types"

import {
  FetchVeridaDataRecordsResult,
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { VeridaInboxMessageRecordArraySchema } from "@/features/verida-inbox/schemas"
import {
  VeridaInboxMessage,
  VeridaInboxMessageRecord,
} from "@/features/verida-inbox/types"

const defaultVeridaDataRecordsQueryOptions: VeridaDatabaseQueryOptions = {
  skip: 0,
  limit: 10,
  sort: [{ sentAt: "desc" }],
}

/**
 * Get the count of unread messages from the messaging engine
 * @param messagingEngine - The Verida messaging engine instance
 * @returns The number of unread messages, or 0 if no messages found
 */
export async function getUnreadMessagesCount(messagingEngine: IMessaging) {
  const unreadMessages = (await messagingEngine.getMessages({
    read: false,
  })) as unknown[]

  return unreadMessages?.length ?? 0
}

/**
 * Get the total count of all messages from the messaging engine
 * @param messagingEngine - The Verida messaging engine instance
 * @returns The total number of messages, or 0 if no messages found
 * @remarks Uses a large limit to ensure all messages are retrieved
 */
export async function getTotalMessagesCount(messagingEngine: IMessaging) {
  const totalMessages = (await messagingEngine.getMessages(
    {},
    { limit: 100000000 }
  )) as unknown[]
  return totalMessages?.length ?? 0
}

export type GetVeridaInboxMessagesArgs = {
  messagingEngine: IMessaging
  filter?: VeridaDatabaseQueryFilter<VeridaInboxMessageRecord>
  options?: VeridaDatabaseQueryOptions<VeridaInboxMessageRecord>
}

/**
 * Get messages from the messaging engine
 *
 * @param args - The arguments to get the messages
 * @param args.messagingEngine - The Verida messaging engine instance
 * @param args.filter - The filter to apply to the messages
 * @param args.options - The options to apply to the messages
 * @returns The messages, or an empty array if no messages found
 */
export async function getVeridaInboxMessages({
  messagingEngine,
  filter,
  options,
}: GetVeridaInboxMessagesArgs): Promise<
  FetchVeridaDataRecordsResult<VeridaInboxMessage>
> {
  const resolvedOptions = {
    // A simple merge is enough as the default options are not in nested objects
    ...defaultVeridaDataRecordsQueryOptions,
    ...options,
  }

  const [rawMessages, totalMessagesCount] = await Promise.all([
    messagingEngine.getMessages(filter, resolvedOptions),
    getTotalMessagesCount(messagingEngine),
  ])

  // FIXME: Fix the type, for some reasons the parse returns any
  const validatedMessages = VeridaInboxMessageRecordArraySchema.parse(
    rawMessages as unknown[]
  )

  return {
    records: validatedMessages,
    pagination: {
      limit: resolvedOptions.limit ?? null,
      skipped: resolvedOptions.skip ?? null,
      unfilteredTotalRecordsCount: totalMessagesCount,
    },
  }
}

export type GetVeridaInboxMessageArgs = {
  messagingEngine: IMessaging
  messageRecordId: string
}

/**
 * Get a single inbox message from the messaging engine
 *
 * @param args - The arguments to get the message
 * @param args.messagingEngine - The Verida messaging engine instance
 * @param args.messageRecordId - The ID of the message to fetch
 * @returns The message, or null if no message found
 */
export async function getVeridaInboxMessage({
  messagingEngine,
  messageRecordId,
}: GetVeridaInboxMessageArgs): Promise<VeridaInboxMessageRecord | null> {
  const results = await getVeridaInboxMessages({
    messagingEngine,
    filter: {
      _id: messageRecordId,
    },
  })

  if (results.records.length === 0) {
    return null
  }

  return results.records[0]
}
