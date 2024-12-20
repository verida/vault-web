import { IMessaging } from "@verida/types"

import {
  FetchVeridaDataRecordsResult,
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import {
  VeridaInboxMessageRecordArraySchema,
  VeridaInboxMessageTypeDataRequestDataSchema,
  VeridaInboxMessageTypeDataSendDataSchema,
} from "@/features/verida-inbox/schemas"
import {
  VeridaInboxMessage,
  VeridaInboxMessageRecord,
  VeridaInboxMessageSupportedType,
  VeridaMessageStatus,
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
/**
 * Get the status of a Verida inbox message based on its type and data
 *
 * @param messageType - The type of the Verida inbox message (MESSAGE, DATA_SEND, DATA_REQUEST)
 * @param messageData - The data payload of the message to check the status from
 * @returns The status of the message:
 *  - "accepted" if the message was accepted
 *  - "rejected" if the message was rejected
 *  - "pending" if the message is waiting for a response
 *  - null if the message type doesn't support status or if the data is invalid
 */
export function getVeridaMessageStatus(
  messageType?: string,
  messageData?: unknown
): VeridaMessageStatus {
  switch (messageType) {
    case VeridaInboxMessageSupportedType.MESSAGE:
      // no status in a plain message
      return null
    case VeridaInboxMessageSupportedType.DATA_SEND: {
      const dataValidationResult =
        VeridaInboxMessageTypeDataSendDataSchema.safeParse(messageData)

      if (!dataValidationResult.success) {
        return null
      }

      switch (dataValidationResult.data.status) {
        case "accept":
          return "accepted"
        case "reject":
          return "rejected"
        default:
          return "pending"
      }
    }
    case VeridaInboxMessageSupportedType.DATA_REQUEST: {
      const dataValidationResult =
        VeridaInboxMessageTypeDataRequestDataSchema.safeParse(messageData)

      if (!dataValidationResult.success) {
        return null
      }

      switch (dataValidationResult.data.status) {
        case "accept":
          return "accepted"
        case "reject":
          return "rejected"
        default:
          return "pending"
      }
    }
    default:
      return null
  }
}
