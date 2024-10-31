import { z } from "zod"

import {
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
} from "@/features/assistants/schemas"

export type HotloadStatus = "idle" | "loading" | "success" | "error"

export type RecommendedPrompt = {
  label: string
  prompt: string
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

export type PrivateDataApiV1LLMPersonalResponse = z.infer<
  typeof PrivateDataApiV1LLMPersonalResponseSchema
>

export type PrivateDataApiV1LlmHotloadResponse = z.infer<
  typeof PrivateDataApiV1LlmHotloadResponseSchema
>
