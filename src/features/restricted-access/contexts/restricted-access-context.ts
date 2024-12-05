import { createContext } from "react"

import { RestrictedAccessStatus } from "@/features/restricted-access/types"

export type RestrictedAccessContextValue = {
  isLoading: boolean
  access: RestrictedAccessStatus
}

export const RestrictedAccessContext =
  createContext<RestrictedAccessContextValue | null>(null)
