"use client"

import { useQuery } from "@tanstack/react-query"
import { ReactNode, useEffect, useMemo, useState } from "react"

import { featureFlags } from "@/config/features"
import {
  RestrictedAccessContext,
  RestrictedAccessContextValue,
} from "@/features/restricted-access/contexts/restricted-access-context"
import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { getRestrictedAccessStatus } from "@/features/restricted-access/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export interface RestrictedAccessProviderProps {
  children: ReactNode
}

export function RestrictedAccessProvider(props: RestrictedAccessProviderProps) {
  const { children } = props

  const { did } = useVerida()

  const [persist, setPersist] = useState(false)

  const { data, isLoading, isError } = useQuery({
    enabled: !!did && !featureFlags.restrictedAccess.disabled,
    queryKey: ["restricted-access", "status", did],
    queryFn: async (): Promise<RestrictedAccessStatus> => {
      if (!did) {
        return "denied"
      }
      return getRestrictedAccessStatus(did)
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    meta: {
      persist,
      logCategory: "restricted-access",
      errorMessage: "Failed to get user access",
    },
  })

  useEffect(() => {
    setPersist(data === "allowed")
  }, [data])

  const value: RestrictedAccessContextValue = useMemo(
    () => ({
      access: featureFlags.restrictedAccess.disabled
        ? "allowed"
        : (data ?? "denied"),
      isLoading,
      isError,
    }),
    [isLoading, data, isError]
  )

  return (
    <RestrictedAccessContext.Provider value={value}>
      {children}
    </RestrictedAccessContext.Provider>
  )
}
RestrictedAccessProvider.displayName = "RestrictedAccessProvider"
