/**
 * Very basic implementation for UI purpose for now
 */
export type AssistantChat = {
  messages: AssistantChatMessage[]
}

/**
 * Very basic implementation for UI purpose for now
 */
export type AssistantChatParticipant = "user" | "assistant"

/**
 * Very basic implementation for UI purpose for now
 */
export type AssistantChatMessage = {
  // id: string
  sender: AssistantChatParticipant
  content: string
  // timestamp: string
}
