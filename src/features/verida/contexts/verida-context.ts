import { type DatastoreOpenConfig, type IDatastore } from "@verida/types"
import { type WebUser } from "@verida/web-helpers"
import { type MutableRefObject, createContext } from "react"

export type VeridaContextType = {
  webUserInstanceRef: MutableRefObject<WebUser>
  isReady: boolean
  isConnected: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  did: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getAccountSessionToken: () => Promise<string>
  openDatastore: (
    schemaUrl: string,
    config?: DatastoreOpenConfig
  ) => Promise<IDatastore>
}

export const VeridaContext = createContext<VeridaContextType | null>(null)
