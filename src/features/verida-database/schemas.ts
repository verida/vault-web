import { z } from "zod"

export const VeridaBaseRecordSchema = z
  .object({
    _id: z.string(),
    _rev: z.string().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
    icon: z.string().optional(),
    schema: z.string().optional(),
    insertedAt: z.string().optional(),
    modifiedAt: z.string().optional(),
  })
  .passthrough()

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseQueryApiResponseSchema = z.object({
  items: z.array(VeridaBaseRecordSchema),
  limit: z.number().optional(),
  skip: z.number().optional(),
  dbRows: z.number().optional(),
})

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseGetRecordApiResponseSchema = z.object({
  item: VeridaBaseRecordSchema,
})
