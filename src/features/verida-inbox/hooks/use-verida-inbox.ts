import { useContext } from "react"

import { VeridaInboxContext } from "@/features/verida-inbox/contexts/verida-inbox-context"

export function useVeridaInbox() {
  const contextValue = useContext(VeridaInboxContext)

  if (!contextValue) {
    throw new Error("useVeridaInbox must be used within a VeridaInboxProvider")
  }

  return contextValue
}
