import { IMessaging } from "@verida/types"
import { WebUser } from "@verida/web-helpers"

import { Logger } from "@/features/telemetry/logger"
import {
  FetchVeridaDataRecordsResult,
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import {
  VeridaInboxMessageRecordArraySchema,
  VeridaInboxMessageTypeDataRequestDataSchema,
  VeridaInboxMessageTypeDataSendDataSchema,
  VeridaInboxMessageTypeMessageDataSchema,
} from "@/features/verida-inbox/schemas"
import {
  VeridaInboxMessage,
  VeridaInboxMessageRecord,
  VeridaInboxMessageSupportedType,
  VeridaMessageStatus,
} from "@/features/verida-inbox/types"

const logger = Logger.create("verida-inbox")

const defaultVeridaDataRecordsQueryOptions: VeridaDatabaseQueryOptions = {
  skip: 0,
  limit: 10,
  sort: [{ sentAt: "desc" }],
}

/**
 * Get the count of unread messages from the messaging engine
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @returns The number of unread messages, or 0 if no messages found
 */
export async function getUnreadMessagesCount(messagingEngine: IMessaging) {
  logger.info(`Getting unread messages count`)

  const unreadMessages = (await messagingEngine.getMessages({
    read: false,
  })) as unknown[]

  logger.debug(`Unread messages count fetched`)

  return unreadMessages?.length ?? 0
}

/**
 * Get the total count of all messages from the messaging engine
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @returns The total number of messages, or 0 if no messages found
 * @remarks Uses a large limit to ensure all messages are retrieved
 */
export async function getTotalMessagesCount(messagingEngine: IMessaging) {
  logger.info(`Getting total messages count`)

  const totalMessages = (await messagingEngine.getMessages(
    {},
    { limit: 100000000 }
  )) as unknown[]

  logger.debug(`Total messages count fetched`)

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
  logger.info(`Getting inbox messages`)

  const resolvedOptions = {
    // A simple merge is enough as the default options are not in nested objects
    ...defaultVeridaDataRecordsQueryOptions,
    ...options,
  }

  const [rawMessages, totalMessagesCount] = await Promise.all([
    messagingEngine.getMessages(filter, resolvedOptions),
    getTotalMessagesCount(messagingEngine),
  ])

  logger.debug(`Inbox messages fetched`)

  logger.debug("Validating inbox messages")

  // FIXME: Fix the type, for some reasons the parse returns any
  const validatedMessages = VeridaInboxMessageRecordArraySchema.parse(
    rawMessages as unknown[]
  )

  logger.debug("Inbox messages validated")

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
  logger.info(`Getting a single inbox message`)

  const results = await getVeridaInboxMessages({
    messagingEngine,
    filter: {
      _id: messageRecordId,
    },
  })

  if (results.records.length === 0) {
    logger.info(`Single inbox message not found`)
    return null
  }

  logger.info(`Single inbox message found`)

  return results.records[0]
}

/**
 * Mark a Verida inbox message as read
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to mark as read
 * @returns A promise that resolves when the message is marked as read
 * @throws {Error} If message record ID is missing
 * @throws {Error} If message is already marked as read
 * @throws {Error} If saving the updated message fails
 */
export function markMessageAsRead(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord
) {
  return updateMessageReadStatus(messagingEngine, messageRecord, "read")
}

/**
 * Mark a Verida inbox message as unread
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to mark as unread
 * @returns A promise that resolves when the message is marked as unread
 * @throws {Error} If message record ID is missing
 * @throws {Error} If message is already marked as unread
 * @throws {Error} If saving the updated message fails
 */
export function markMessageAsUnread(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord
) {
  return updateMessageReadStatus(messagingEngine, messageRecord, "unread")
}

/**
 * Update the read status of a Verida inbox message
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to update
 * @param readStatus - The desired read status ("read" or "unread")
 * @throws {Error} If message record ID is missing
 * @throws {Error} If message is already in the desired read status
 * @throws {Error} If saving the updated message fails
 */
async function updateMessageReadStatus(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord,
  readStatus: "read" | "unread"
): Promise<void> {
  logger.info(`Marking inbox message as ${readStatus}`)

  if (!messageRecord._id) {
    throw new Error("Inbox message record ID is required")
  }

  const latestMessageRecord = await getVeridaInboxMessage({
    messagingEngine,
    messageRecordId: messageRecord._id,
  })

  if (!latestMessageRecord) {
    throw new Error("Inbox message record not found")
  }

  const updatedMessageRecord = {
    ...latestMessageRecord,
    read: readStatus === "read",
  }

  if (!!updatedMessageRecord.read === !!messageRecord.read) {
    throw new Error(`Inbox message already marked as ${readStatus}`)
  }

  try {
    const inbox = await messagingEngine.getInbox()
    await inbox.privateInbox.save(updatedMessageRecord)

    logger.info(`Inbox message marked as ${readStatus}`)
  } catch (error) {
    throw new Error(`Failed to mark inbox message as ${readStatus}`, {
      cause: error,
    })
  }
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
          return "declined"
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
          return "declined"
        default:
          return "pending"
      }
    }
    default:
      return null
  }
}

/**
 * Extracts and validates the data from a message inbox message.
 * Handles both current and legacy message data formats.
 *
 * @param messageRecord - The inbox message record to extract data from
 * @returns The parsed and validated message data if successful, null if:
 *  - The message is not of type MESSAGE
 *  - The message data fails schema validation for both current and legacy formats
 *  - The legacy data array is empty or contains invalid data
 */
export function getDataFromMessage(messageRecord: VeridaInboxMessageRecord) {
  if (messageRecord.type !== VeridaInboxMessageSupportedType.MESSAGE) {
    return null
  }

  const validationResult = VeridaInboxMessageTypeMessageDataSchema.safeParse(
    messageRecord.data
  )

  if (validationResult.success) {
    return validationResult.data
  }

  const legacyDataValidationResult =
    VeridaInboxMessageTypeDataSendDataSchema.safeParse(messageRecord.data)

  if (!legacyDataValidationResult.success) {
    logger.warn("Failed to parse data of message inbox message")
    return null
  }

  const legacyData = legacyDataValidationResult.data.data
  const dataItem = legacyData && legacyData.length > 0 ? legacyData[0] : null

  const legacyDataItemValidationResult =
    VeridaInboxMessageTypeMessageDataSchema.safeParse(dataItem)

  if (!legacyDataItemValidationResult.success) {
    logger.warn("Failed to parse data of message inbox message")
    return null
  }

  return legacyDataItemValidationResult.data
}

/**
 * Extracts and validates the data from an incoming data message.
 *
 * @param messageRecord - The inbox message record to extract data from
 * @returns The parsed and validated data if successful, null if:
 *  - The message is not of type DATA_SEND
 *  - The message data fails schema validation
 */
export function getDataFromIncomingDataMessage(
  messageRecord: VeridaInboxMessageRecord
) {
  if (messageRecord.type !== VeridaInboxMessageSupportedType.DATA_SEND) {
    return null
  }

  try {
    return VeridaInboxMessageTypeDataSendDataSchema.parse(messageRecord.data)
  } catch (error) {
    logger.warn("Failed to parse data of incoming data inbox message")
    return null
  }
}

/**
 * Extracts and validates the data from a data request message.
 *
 * @param messageRecord - The inbox message record to extract data from
 * @returns The parsed and validated data if successful, null if:
 *  - The message is not of type DATA_REQUEST
 *  - The message data fails schema validation against VeridaInboxMessageTypeDataRequestDataSchema
 */
export function getDataFromDataRequestMessage(
  messageRecord: VeridaInboxMessageRecord
) {
  if (messageRecord.type !== VeridaInboxMessageSupportedType.DATA_REQUEST) {
    return null
  }

  try {
    return VeridaInboxMessageTypeDataRequestDataSchema.parse(messageRecord.data)
  } catch (error) {
    logger.warn("Failed to parse data of data request inbox message")
    return null
  }
}

export function getDataFromAnyMessage(messageRecord: VeridaInboxMessageRecord) {
  switch (messageRecord.type) {
    case VeridaInboxMessageSupportedType.DATA_SEND:
      return getDataFromIncomingDataMessage(messageRecord)
    case VeridaInboxMessageSupportedType.DATA_REQUEST:
      return getDataFromDataRequestMessage(messageRecord)
    default:
      return null
  }
}

/**
 * Decline an incoming data message
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to decline
 * @returns A promise that resolves when the message is declined
 * @throws {Error} If the message is already declined
 * @throws {Error} If the message data fails schema validation
 * @throws {Error} If saving the updated message fails
 */
export async function declineIncomingDataMessage(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord
): Promise<void> {
  logger.info("Declining incoming data message")

  const latestMessageRecord = await getVeridaInboxMessage({
    messagingEngine,
    messageRecordId: messageRecord._id,
  })

  if (!latestMessageRecord) {
    throw new Error("Inbox message record not found")
  }

  const data = getDataFromIncomingDataMessage(latestMessageRecord)

  if (!data) {
    throw new Error("Failed to parse data of incoming data inbox message")
  }

  if (data.status) {
    throw new Error(`Incoming data message already ${data.status}`)
  }

  const updatedMessageRecord: VeridaInboxMessageRecord = {
    ...latestMessageRecord,
    data: {
      ...data,
      status: "reject",
    },
    read: true,
  }

  try {
    const inbox = await messagingEngine.getInbox()
    await inbox.privateInbox.save(updatedMessageRecord)

    logger.info("Incoming data message declined")
  } catch (error) {
    throw new Error("Failed to decline incoming data message", {
      cause: error,
    })
  }
}

/**
 * Decline a data request message
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to decline
 * @returns A promise that resolves when the message is declined
 * @throws {Error} If the message is already declined
 * @throws {Error} If the message data fails schema validation
 * @throws {Error} If saving the updated message fails
 */
export async function declineDataRequestMessage(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord
): Promise<void> {
  logger.info("Declining data request message")

  const latestMessageRecord = await getVeridaInboxMessage({
    messagingEngine,
    messageRecordId: messageRecord._id,
  })

  if (!latestMessageRecord) {
    throw new Error("Inbox message record not found")
  }

  const data = getDataFromDataRequestMessage(latestMessageRecord)

  if (!data) {
    throw new Error("Failed to parse data of data request inbox message")
  }

  if (data.status) {
    throw new Error(`Data request message already ${data.status}`)
  }

  const updatedMessageRecord: VeridaInboxMessageRecord = {
    ...latestMessageRecord,
    data: {
      ...data,
      status: "reject",
    },
    read: true,
  }

  try {
    const inbox = await messagingEngine.getInbox()
    await inbox.privateInbox.save(updatedMessageRecord)

    logger.info("Data request message declined")
  } catch (error) {
    throw new Error("Failed to decline data request message", {
      cause: error,
    })
  }
}

/**
 * Resets the status of a message back to pending by removing the status field.
 * This allows a previously accepted or declined message to be actioned again.
 *
 * @param messagingEngine - The Verida messaging engine instance
 * @param messageRecord - The message record to reset the status for
 * @returns A promise that resolves when the message status is reset
 * @throws {Error} If the message record is not found
 * @throws {Error} If the message data fails schema validation
 * @throws {Error} If saving the updated message fails
 */
export async function resetMessageStatus(
  messagingEngine: IMessaging,
  messageRecord: VeridaInboxMessageRecord
): Promise<void> {
  logger.info("Resetting message status")

  const latestMessageRecord = await getVeridaInboxMessage({
    messagingEngine,
    messageRecordId: messageRecord._id,
  })

  if (!latestMessageRecord) {
    throw new Error("Inbox message record not found")
  }

  const data = getDataFromAnyMessage(latestMessageRecord)

  if (!data) {
    throw new Error("Failed to parse data of data request inbox message")
  }

  if (!data.status) {
    return
  }

  const updatedMessageRecord: VeridaInboxMessageRecord = {
    ...latestMessageRecord,
    data: {
      ...data,
      status: undefined,
    },
  }

  try {
    const inbox = await messagingEngine.getInbox()
    await inbox.privateInbox.save(updatedMessageRecord)

    logger.info("Message status reset")
  } catch (error) {
    throw new Error("Failed to reset message status", {
      cause: error,
    })
  }
}
