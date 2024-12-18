import { IMessaging } from "@verida/types"
import { createContext } from "react"

export type VeridaInboxContextType = {
  messagingEngine: IMessaging | null
}

export const VeridaInboxContext = createContext<VeridaInboxContextType | null>(
  null
)
