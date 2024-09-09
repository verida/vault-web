/**
 * @deprecated
 */
export type DataField = {
  field: string
  value: unknown
}

/**
 * @deprecated
 */
export type DataItem = {
  data: DataField[]
  title: string
}

export type DatabaseDefinition = {
  id: string
  title: string
  titlePlural: string
  color: string
  databaseVaultName: string
}

export type DataSchema = {
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
