import type { Account } from "@verida/account"
import type { Client, Context } from "@verida/client-ts"
import { createContext } from "react"

export type VeridaContextType = {
  client: Client
  account: Account | null
  did: string | null
  context: Context | null
  isConnected: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getAccountSessionToken: () => Promise<string>
}

export const VeridaContext = createContext<VeridaContextType | null>(null)
