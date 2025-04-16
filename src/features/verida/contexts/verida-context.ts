import type { Account } from "@verida/account"
import type { Client, Context } from "@verida/client-ts"
import { createContext } from "react"

import type { VeridaAccountType, VeridaStatus } from "@/features/verida/types"

export type VeridaContextType = {
  client: Client | null
  account: Account | null
  did: string | null
  context: Context | null
  sessionToken: string | null
  status: VeridaStatus
  accountType: VeridaAccountType | null
  connectAccount: (account: Account) => Promise<void>
  requestThirdWebConsentSignature: () => Promise<void>
  connectLegacyAccount: () => Promise<void>
  disconnect: () => Promise<void>

  /** @deprecated Use `sessionToken` instead */
  getAccountSessionToken: () => Promise<string>
}

export const VeridaContext = createContext<VeridaContextType | null>(null)
