import { z } from "zod"

import { PrivateDataApiV1LLMPersonalResponseSchema } from "@/features/assistant/schemas"

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

export type PrivateDataApiV1LLMPersonalResponse = z.infer<
  typeof PrivateDataApiV1LLMPersonalResponseSchema
>
