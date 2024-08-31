import { useContext } from "react"

import { InboxContext } from "@/features/inbox/contexts/InboxContext"

export const useInboxContext = () => {
  const context = useContext(InboxContext)
  if (!context) {
    throw new Error("useInbox must be used within an InboxProvider")
  }

  return context
}
