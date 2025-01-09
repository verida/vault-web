// Defining the schemas manually because Zod/Typescript have an issue to infer the type of properties because of the recursive nature of the schema
export interface JsonSchemaProperty {
  // Basic property info
  $ref?: string
  title?: string
  description?: string
  type?:
    | "string"
    | "number"
    | "integer"
    | "boolean"
    | "array"
    | "object"
    | "null"

  // Validation keywords
  required?: string[]
  enum?: any[]
  const?: any

  // String validations
  minLength?: number
  maxLength?: number
  pattern?: string
  format?: string

  // Number validations
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean | number
  exclusiveMaximum?: boolean | number
  multipleOf?: number

  // Array validations
  items?: JsonSchemaProperty | JsonSchemaProperty[]
  minItems?: number
  maxItems?: number
  uniqueItems?: boolean

  // Object validations
  properties?: Record<string, JsonSchemaProperty>

  // Combining schemas
  allOf?: JsonSchemaProperty[]
  anyOf?: JsonSchemaProperty[]
  oneOf?: JsonSchemaProperty[]

  // Additional metadata
  default?: any
  $defs?: Record<string, JsonSchemaProperty>
}

// Defining the schemas manually because Zod/Typescript have an issue to infer the type of properties because of the recursive nature of the schema
export interface JsonSchema {
  // Schema metadata (root-level only)
  $schema?: string
  $id?: string
  title?: string
  description?: string

  // Core schema definition
  type: "object"
  required?: string[]
  properties: Record<string, JsonSchemaProperty>
  $defs?: Record<string, JsonSchemaProperty>
}

export interface VeridaDataSchema extends JsonSchema {
  titlePlural?: string
  appearance?: {
    style?: {
      color?: string
      icon?: string
    }
  }
  database?: {
    name?: string
    indexes?: Record<string, string[]>
  }
  layouts?: {
    create?: string[]
    view?: string[]
    list?: string[]
  }
}
