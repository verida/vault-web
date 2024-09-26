"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import {
  prefetchDataConnections,
  prefetchDataProviders,
} from "@/features/data-connections/hooks"
import { useVerida } from "@/features/verida"

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props

  const { did } = useVerida()
  const queryClient = useQueryClient()

  useEffect(() => {
    // No need to catch, prefetch doesn't throw errors
    prefetchDataProviders(queryClient)

    // No need to catch, prefetch doesn't throw errors
    prefetchDataConnections(queryClient, did)
  }, [queryClient, did])

  return <>{children}</>
}
DataConnectionsProvider.displayName = "DataConnectionsProvider"
