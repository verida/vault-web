import { useContext } from "react"

import { RestrictedAccessContext } from "@/features/restricted-access/contexts/restricted-access-context"

export function useRestrictedAccess() {
  const context = useContext(RestrictedAccessContext)

  if (!context) {
    throw new Error(
      "useRestrictedAccess must be used within a RestrictedAccessProvider"
    )
  }

  return context
}
