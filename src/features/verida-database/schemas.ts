import { z } from "zod"

export const VeridaBaseRecordSchema = z.object({
  _id: z.string(),
  _rev: z.string().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
  icon: z.string().optional(),
  schema: z.string().optional(),
  insertedAt: z.string().optional(),
  modifiedAt: z.string().optional(),
})

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseQueryApiV1ResponseSchema = z.object({
  items: z.array(VeridaBaseRecordSchema.passthrough()),
  limit: z.number().optional(),
  skip: z.number().optional(),
  dbRows: z.number().optional(),
})

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseGetRecordApiV1ResponseSchema = z.object({
  item: VeridaBaseRecordSchema.passthrough(),
})

export const VeridaDatabaseDeleteApiV1ResponseSchema = z.object({
  success: z.boolean(),
})

// TODO: Instead, create a function taking a schema as argument and then build the API response schema with it
export const VeridaDatabaseCreateRecordApiV1ResponseSchema =
  z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      record: VeridaBaseRecordSchema.passthrough(),
    }),
    z.object({
      success: z.literal(false),
      errors: z.any(), // TODO: Define better type, unsure what it is
    }),
  ])
