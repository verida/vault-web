import { z } from "zod"

import {
  DataProviderHandlerSchema,
  DataProviderSchema,
} from "@/features/connections/schemas"

export type DataProvider = z.infer<typeof DataProviderSchema>
export type DataProviderHandler = z.infer<typeof DataProviderHandlerSchema>

export type Connection = DataProvider & {
  userId?: string
}

export type SupportedData = {
  title: string
  lastSynced: string
  summary: string
  itemCount: number
  backdate: string
}

export type ConnectionLog = {
  source: string
  type: string
  id: number
  message: string
  timestamp: string
}
