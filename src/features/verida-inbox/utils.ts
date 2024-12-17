import { IMessaging } from "@verida/types"

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
