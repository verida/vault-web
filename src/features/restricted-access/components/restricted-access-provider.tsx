"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import {
  RestrictedAccessContext,
  RestrictedAccessContextValue,
} from "@/features/restricted-access/contexts/restricted-access-context"
import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { getRestrictedAccessStatus } from "@/features/restricted-access/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type RestrictedAccessProviderProps = {
  children: React.ReactNode
}

export function RestrictedAccessProvider(props: RestrictedAccessProviderProps) {
  const { children } = props

  const { did } = useVerida()

  const [persist, setPersist] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["restricted-access", "status", did],
    queryFn: async (): Promise<RestrictedAccessStatus> => {
      if (!did) {
        return "denied"
      }
      return getRestrictedAccessStatus(did)
    },
    enabled: !!did,
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
      isLoading,
      access: data ?? "denied",
    }),
    [isLoading, data]
  )

  return (
    <RestrictedAccessContext.Provider value={value}>
      {children}
    </RestrictedAccessContext.Provider>
  )
}
RestrictedAccessProvider.displayName = "RestrictedAccessProvider"
