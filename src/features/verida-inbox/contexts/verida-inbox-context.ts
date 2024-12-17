import { IMessaging } from "@verida/types"
import { MutableRefObject, createContext } from "react"

export type VeridaInboxContextType = {
  messagingEngineRef: MutableRefObject<IMessaging | undefined>
}

export const VeridaInboxContext = createContext<VeridaInboxContextType | null>(
  null
)
