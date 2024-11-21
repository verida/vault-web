import { z } from "zod"

import {
  AiAssistantBaseSchema,
  AiPromptBaseSchema,
  AiPromptFormDataSchema,
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
} from "@/features/assistants/schemas"
import { VeridaRecord } from "@/features/verida-database/types"

export type HotloadStatus = "idle" | "loading" | "success" | "error"

export type HotloadResult = {
  status: HotloadStatus
  progress: number
}

export type AiAssistantBase = z.infer<typeof AiAssistantBaseSchema>

export type AiAssistantRecord = VeridaRecord<AiAssistantBase>

export type AiPromptBase = z.infer<typeof AiPromptBaseSchema>

export type AiPromptRecord = VeridaRecord<AiPromptBase>

export type AiPromptFormData = z.infer<typeof AiPromptFormDataSchema>

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
}

export type PrivateDataApiV1LLMPersonalResponse = z.infer<
  typeof PrivateDataApiV1LLMPersonalResponseSchema
>

export type PrivateDataApiV1LlmHotloadResponse = z.infer<
  typeof PrivateDataApiV1LlmHotloadResponseSchema
>
