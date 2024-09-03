import { z } from "zod"

import {
  DataProviderHandlerSchema,
  DataProviderSchema,
} from "@/features/data-connections/schemas"

export type DataProvider = z.infer<typeof DataProviderSchema>
export type DataProviderHandler = z.infer<typeof DataProviderHandlerSchema>

export type DataConnection = DataProvider & {
  userId?: string
}

/**
 * @deprecated
 */
export type SupportedData = {
  title: string
  lastSynced: string
  summary: string
  itemCount: number
  backdate: string
}

export type DataConnectionLog = {
  source: string
  type: string
  id: number
  message: string
  timestamp: string
}
