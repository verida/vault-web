import type { Account } from "@verida/account"
import type { Client, Context } from "@verida/client-ts"
import { createContext } from "react"

export type VeridaContextType = {
  client: Client | null
  account: Account | null
  did: string | null
  context: Context | null
  sessionToken: string | null
  isConnected: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  connectAccount: (account: Account) => Promise<void>
  connectLegacyAccount: () => Promise<void>
  disconnect: () => Promise<void>

  /** @deprecated Use `sessionToken` instead */
  getAccountSessionToken: () => Promise<string>
}

export const VeridaContext = createContext<VeridaContextType | null>(null)
