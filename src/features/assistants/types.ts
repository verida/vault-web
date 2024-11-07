import { z } from "zod"

import {
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
} from "@/features/assistants/schemas"

export type HotloadStatus = "idle" | "loading" | "success" | "error"

export type HotloadResult = {
  status: HotloadStatus
  progress: number
}

export type SuggestedInput = {
  label: string
  input: AssistantUserInput
}

export type AssistantUserInput = {
  prompt: string
  // TODO: add further configuration options (LLM model, data type, filters, etc.)
}

export type AssistantOutput = {
  result: string
  processedAt: Date
  processingTime?: number
  databases?: string[]
  keywords?: string[]
}

export type PrivateDataApiV1LLMPersonalResponse = z.infer<
  typeof PrivateDataApiV1LLMPersonalResponseSchema
>

export type PrivateDataApiV1LlmHotloadResponse = z.infer<
  typeof PrivateDataApiV1LlmHotloadResponseSchema
>
