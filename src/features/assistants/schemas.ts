import { z } from "zod"

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

export const AiPromptBaseSchema = z.object({
  assistantId: z.string(),
  name: z.string(),
  prompt: z.string(),
  order: z.number().optional(),
})
