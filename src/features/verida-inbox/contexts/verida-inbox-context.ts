import type { IMessaging } from "@verida/types"
import { createContext } from "react"

import type { VeridaMessagingEngineStatus } from "@/features/verida-inbox/types"

export type VeridaInboxContextType = {
  messagingEngine: IMessaging | null
  messagingEngineStatus: VeridaMessagingEngineStatus
}

export const VeridaInboxContext = createContext<VeridaInboxContextType | null>(
  null
)
