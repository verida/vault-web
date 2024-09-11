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
