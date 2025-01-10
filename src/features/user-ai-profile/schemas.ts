import { z } from "zod"

import { JsonSchemaSchema } from "@/features/verida-data-schemas/schemas"

export const UserAiProfileParamsSchema = z
  .object({
    schema: z.union([JsonSchemaSchema, z.string()]).optional(),
    promptSearchTip: z.string().optional(),
    provider: z.string().optional(),
    model: z.string().optional(),
  })
  .passthrough()

export const GetUserAiProfileV1ResponseSchema = z
  .object({
    response: z.object({
      output: z.record(z.unknown()),
    }),
    duration: z.number().optional(),
  })
  .passthrough()
