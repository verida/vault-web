export type StandardJsonDataSchema = {
  $schema: string
  $id: string
  title: string
  titlePlural: string
  description: string
  type: string
  allOf: (
    | { $ref: string }
    | {
        properties: Record<string, { title: string; type: string }>
        required: string[]
      }
  )[]
  properties: Record<string, { title: string; type: string }>
}

export type VeridaDataSchema = StandardJsonDataSchema & {
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
  }
}

/**
 * @deprecated
 */
export type DataSchema_Legacy = {
  $schema: string
  $id: string
  title: string
  titlePlural: string
  description: string
  type: string
  appearance: {
    style: {
      color: string
      icon: string
    }
  }
  database: {
    name: string
    indexes: {
      email: string[]
      did: string[]
      name: string[]
    }
  }
  layouts: {
    create: string[]
    view: string[]
  }
  allOf: (
    | { $ref: string }
    | {
        properties: Record<string, { title: string; type: string }>
        required: string[]
      }
  )[]
  properties: Record<string, { title: string; type: string }>
}
