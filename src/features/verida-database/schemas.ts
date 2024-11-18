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

/**
 * Creates a Zod schema for validating Verida record creation API responses.
 *
 * @param baseSchema - Optional Zod object schema that will extend the base Verida record schema. No need to pass a VeridaRecord schema already, simply the specific fields of the record.
 * @returns A Zod schema for validating the API response
 *
 * @example
 * ```ts
 * const CustomSchema = z.object({
 *   customField: z.string()
 * })
 * const responseSchema = getCreateVeridaRecordApiV1ResponseSchema(CustomSchema)
 * ```
 */
export function getCreateVeridaRecordApiV1ResponseSchema<
  T extends z.ZodObject<any>,
>(baseSchema?: T) {
  return z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      record: baseSchema
        ? VeridaBaseRecordSchema.extend(baseSchema.shape)
        : VeridaBaseRecordSchema.passthrough(),
    }),
    z.object({
      success: z.literal(false),
      errors: z.any(), // TODO: Define better type, unsure what it is
    }),
  ])
}

/**
 * Creates a Zod schema for validating Verida record update API responses.
 *
 * @param baseSchema - Optional Zod object schema that will extend the base Verida record schema. No need to pass a VeridaRecord schema already, simply the specific fields of the record.
 * @returns A Zod schema for validating the API response
 *
 * @example
 * ```ts
 * const CustomSchema = z.object({
 *   customField: z.string()
 * })
 * const responseSchema = getUpdateVeridaRecordApiV1ResponseSchema(CustomSchema)
 * ```
 */
export function getUpdateVeridaRecordApiV1ResponseSchema<
  T extends z.ZodObject<any>,
>(baseSchema?: T) {
  return z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      record: baseSchema
        ? VeridaBaseRecordSchema.extend(baseSchema.shape)
        : VeridaBaseRecordSchema.passthrough(),
    }),
    z.object({
      success: z.literal(false),
      message: z.string().optional(),
      errors: z.any().optional(), // TODO: Define better type, unsure what it is
    }),
  ])
}
