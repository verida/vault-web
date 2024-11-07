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
  process: z
    .object({
      databases: z.array(z.string()),
      keywords: z.array(z.string()),
      // Add other fields as needed
    })
    .passthrough(),
})
