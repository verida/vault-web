import { z } from "zod"

export const BasicJsonDataSchemaSchema = z.object({
  $schema: z.string(),
  $id: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

export const BasicVeridaDataSchemaSchema = BasicJsonDataSchemaSchema.extend({
  titlePlural: z.string().optional(),
  appearance: z
    .object({
      style: z
        .object({
          color: z.string().optional(),
          icon: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  database: z
    .object({
      name: z.string().optional(),
      indexes: z.record(z.array(z.string())).optional(),
    })
    .optional(),
  layouts: z
    .object({
      create: z.array(z.string()).optional(),
      view: z.array(z.string()).optional(),
      list: z.array(z.string()).optional(),
    })
    .optional(),
})
