import { z } from "zod"

import {
  ProviderHandlerSchema,
  ProviderSchema,
} from "@/features/connections/schemas"

export type Provider = z.infer<typeof ProviderSchema>
export type ProviderHandler = z.infer<typeof ProviderHandlerSchema>

export type Connection = Provider & {
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
