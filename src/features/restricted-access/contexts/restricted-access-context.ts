import { createContext } from "react"

import { RestrictedAccessStatus } from "@/features/restricted-access/types"

export type RestrictedAccessContextValue = {
  access: RestrictedAccessStatus
  isLoading: boolean
  isError: boolean
}

export const RestrictedAccessContext =
  createContext<RestrictedAccessContextValue | null>(null)
