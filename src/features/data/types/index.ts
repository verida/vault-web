// import { VeridaRecord } from "@/features/verida"

export type DataField = {
  field: string
  value: unknown
}

export type DataItem = {
  data: DataField[]
  title: string
}

export type DatabaseDefinition = {
  name: string
  title: string
  titlePlural?: string
  icon: React.ReactNode
  color?: string
  database: string
  // layouts?: {
  //   list?: string[]
  //   view?: string[]
  // }
  // sort?: Record<string, unknown>[]
  // fields?: {
  //   [key: string]: {
  //     label: string
  //   }
  // }
  // card?: {
  //   name?: (record: VeridaRecord) => string
  //   summary?: (record: VeridaRecord) => string
  // }
  // nameField?: string
  // summaryField?: string
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
