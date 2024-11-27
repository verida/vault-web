import { z } from "zod"

export const LLM_PROVIDERS = ["bedrock"] as const
export const LlmProviderSchema = z.enum(LLM_PROVIDERS)

export const LLM_MODELS = [
  "LLAMA3.2_3B",
  "LLAMA3.2_1B",
  "LLAMA3.1_70B",
  "LLAMA3.1_8B",
  "LLAMA3_70B",
  "LLAMA3_8B",
  "MIXTRAL_8_7B",
  "MIXTRAL_SMALL",
  "MIXTRAL_LARGE",
] as const
export const LlmModelSchema = z.enum(LLM_MODELS)

// TODO: Handle the mapping LLM models to providers

export const PrivateDataApiV1LlmHotloadResponseSchema = z.object({
  schema: z.string(),
  status: z.string(),
  recordCount: z.number(),
  totalProgress: z.number(),
})

export const PrivateDataApiV1LLMPersonalResponseSchema = z.object({
  result: z.string().min(1, "LLM response is empty"),
  duration: z.number(),
  process: z.object({
    databases: z.array(z.string()).optional(),
  }),
})

export const AiAssistantBaseSchema = z.object({
  name: z.string(),
  order: z.number().optional(),
})

export const AiAssistantFormDataSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters")
    .regex(
      /^[a-zA-Z0-9-_\s]+$/,
      "Name can only contain letters, numbers, hyphens, underscores and spaces"
    ),
})

export const AiPromptBaseSchema = z.object({
  assistantId: z.string(),
  name: z.string(),
  prompt: z.string(),
  order: z.number().optional(),
})

export const AiPromptFormDataSchema = z.object({
  name: z.string().min(1, "Label is required"),
  prompt: z.string().min(1, "Prompt is required"),
})
