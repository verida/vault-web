import { z } from "zod"

// Schema for individual properties within a JSON Schema
const JsonSchemaPropertySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    // Basic property info
    $ref: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    type: z
      .enum([
        "string",
        "number",
        "integer",
        "boolean",
        "array",
        "object",
        "null",
      ])
      .optional(),

    // Validation keywords
    required: z.array(z.string()).optional(),
    enum: z.array(z.any()).optional(),
    const: z.any().optional(),

    // String validations
    minLength: z.number().int().min(0).optional(),
    maxLength: z.number().int().min(0).optional(),
    pattern: z.string().optional(),
    format: z.string().optional(),

    // Number validations
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    exclusiveMinimum: z.union([z.boolean(), z.number()]).optional(),
    exclusiveMaximum: z.union([z.boolean(), z.number()]).optional(),
    multipleOf: z.number().positive().optional(),

    // Array validations
    items: z
      .union([
        z.lazy(() => JsonSchemaPropertySchema),
        z.array(z.lazy(() => JsonSchemaPropertySchema)),
      ])
      .optional(),
    minItems: z.number().int().min(0).optional(),
    maxItems: z.number().int().min(0).optional(),
    uniqueItems: z.boolean().optional(),

    // Object validations
    properties: z.record(z.lazy(() => JsonSchemaPropertySchema)).optional(),

    // Combining schemas
    allOf: z.array(z.lazy(() => JsonSchemaPropertySchema)).optional(),
    anyOf: z.array(z.lazy(() => JsonSchemaPropertySchema)).optional(),
    oneOf: z.array(z.lazy(() => JsonSchemaPropertySchema)).optional(),

    // Additional metadata
    default: z.any().optional(),
    $defs: z.record(z.lazy(() => JsonSchemaPropertySchema)).optional(),
  })
)

// Main JSON Schema definition
// Very loose implementation
export const JsonSchemaSchema = z.object({
  // Schema metadata (root-level only)
  $schema: z.string().url().optional(),
  $id: z.string().url().optional(),
  title: z.string().optional(),
  description: z.string().optional(),

  // Core schema definition
  type: z.enum(["object"]).default("object"),
  required: z.array(z.string()).optional(),
  properties: z.record(JsonSchemaPropertySchema),
  $defs: z.record(JsonSchemaPropertySchema).optional(),
})

export const VeridaDataSchemaSchema = JsonSchemaSchema.extend({
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
