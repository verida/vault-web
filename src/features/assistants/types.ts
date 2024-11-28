import { z } from "zod"

import {
  AiAssistantBaseSchema,
  AiAssistantFormDataSchema,
  AiPromptBaseSchema,
  AiPromptFormDataSchema,
  LlmModelSchema,
  LlmProviderSchema,
  PrivateDataApiV1LLMPersonalResponseSchema,
  PrivateDataApiV1LlmHotloadResponseSchema,
  PromptConfigCommonDataTypeSchema,
  PromptConfigDataTypesSchema,
  PromptConfigEmailDataTypeSchema,
  PromptConfigSchema,
  PromptSearchConfigSchema,
  PromptSearchOutputTypeSchema,
  PromptSearchProfileInformationTypeSchema,
  PromptSearchSortSchema,
  PromptSearchTimeframeSchema,
} from "@/features/assistants/schemas"
import { VeridaRecord } from "@/features/verida-database/types"

// FIXME: Fix the supposedly circular dependency of importing SearchTypeSchema
// import { SearchType } from "@/features/data-search/types"

export type PromptSearchTimeframe = z.infer<typeof PromptSearchTimeframeSchema>

export type PromptSearchSort = z.infer<typeof PromptSearchSortSchema>

export type PromptSearchOutputType = z.infer<
  typeof PromptSearchOutputTypeSchema
>

export type PromptSearchProfileInformationType = z.infer<
  typeof PromptSearchProfileInformationTypeSchema
>

export type PromptSearchConfig = z.infer<typeof PromptSearchConfigSchema>

export type PromptConfigCommonDataType = z.infer<
  typeof PromptConfigCommonDataTypeSchema
>

export type PromptConfigEmailDataType = z.infer<
  typeof PromptConfigEmailDataTypeSchema
>

export type PromptConfigDataTypes = z.infer<typeof PromptConfigDataTypesSchema>

export type PromptConfig = z.infer<typeof PromptConfigSchema>

export type AiAssistantHotloadStatus = "idle" | "loading" | "success" | "error"

export type AiAssistantHotloadResult = {
  status: AiAssistantHotloadStatus
  progress: number
}

export type LlmProvider = z.infer<typeof LlmProviderSchema>
export type LlmModel = z.infer<typeof LlmModelSchema>

export type LLMModelDefinition = {
  provider: LlmProvider
  model: LlmModel
  label: string
}

export type AiAssistantBase = z.infer<typeof AiAssistantBaseSchema>

export type AiAssistantRecord = VeridaRecord<AiAssistantBase>

export type AiAssistantFormData = z.infer<typeof AiAssistantFormDataSchema>

export type AiPromptBase = z.infer<typeof AiPromptBaseSchema>

export type AiPromptRecord = VeridaRecord<AiPromptBase>

export type AiPromptFormData = z.infer<typeof AiPromptFormDataSchema>

export type AiPromptInput = {
  assistantId?: string
  prompt?: string
  config?: {
    llmProvider?: LlmProvider
    llmModel?: LlmModel
    promptConfig?: PromptConfig
    // TODO: add further configuration options (data type, filters, etc.)
  }
}

export type AiAssistantOutput = {
  assistantId?: string
} & (
  | {
      status: "processing"
    }
  | {
      status: "processed"
      result: string
      processedAt: Date
      processingTime?: number
      // databases?: SearchType[]
      databases?: string[]
    }
)

export type PrivateDataApiV1LLMPersonalRequestBody = {
  // TODO: When and if passing the assistantId is supported, add it here but handle when using the default non-existing assistant
  prompt: string
  provider: LlmProvider
  model: LlmModel
  promptConfig?: PromptConfig
}

export type PrivateDataApiV1LLMPersonalResponse = z.infer<
  typeof PrivateDataApiV1LLMPersonalResponseSchema
>

export type PrivateDataApiV1LlmHotloadResponse = z.infer<
  typeof PrivateDataApiV1LlmHotloadResponseSchema
>
