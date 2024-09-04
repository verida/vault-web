import { z } from "zod"

import {
  DataConnectionBaseSchema,
  DataConnectionSyncStatusApiResultItemSchema,
  DataProviderHandlerSchema,
  DataProviderSchema,
} from "@/features/data-connections/schemas"

export type DataProvider = z.infer<typeof DataProviderSchema>
export type DataProviderHandler = z.infer<typeof DataProviderHandlerSchema>

export type DataConnection = z.infer<typeof DataConnectionBaseSchema>

export type DataConnectionSyncStatus = z.infer<
  typeof DataConnectionSyncStatusApiResultItemSchema
>

/**
 * @deprecated
 */
export type LegacyDataConnection = DataProvider & {
  userId: string
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

/**
 * @deprecated
 */
export type DataConnectionLog = {
  source: string
  type: string
  id: number
  message: string
  timestamp: string
}
