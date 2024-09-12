import { z } from "zod"

export const VeridaBaseRecordSchema = z
  .object({
    _id: z.string(),
    _rev: z.string().optional(),
    name: z.string().optional(),
    schema: z.string().optional(),
    insertedAt: z.string().datetime().optional(),
    modifiedAt: z.string().datetime().optional(),
  })
  .passthrough()

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseQueryApiResponseSchema = z.object({
  items: z.array(VeridaBaseRecordSchema),
})
