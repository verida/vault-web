import { type DatastoreOpenConfig, type IDatastore } from "@verida/types"
import { type WebUser } from "@verida/web-helpers"
import React, { createContext } from "react"

import { PublicProfile } from "@/features/verida-profile/types"

export type VeridaContextType = {
  webUserInstanceRef: React.MutableRefObject<WebUser>
  isReady: boolean
  isConnected: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  did: string | null
  profile: PublicProfile | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getAccountSessionToken: () => Promise<string>
  openDatastore: (
    schemaUrl: string,
    config?: DatastoreOpenConfig
  ) => Promise<IDatastore>
}

export const VeridaContext = createContext<VeridaContextType | null>(null)
