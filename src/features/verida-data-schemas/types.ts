import { z } from "zod"

import {
  BasicJsonDataSchemaSchema,
  BasicVeridaDataSchemaSchema,
} from "@/features/verida-data-schemas/schemas"

export type BasicJsonDataSchema = z.infer<typeof BasicJsonDataSchemaSchema>
export type BasicVeridaDataSchema = z.infer<typeof BasicVeridaDataSchemaSchema>
