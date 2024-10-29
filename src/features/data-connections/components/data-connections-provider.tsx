"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import { DATA_CONNECTIONS_SYNC_INTERVAL } from "@/features/data-connections/constants"
import { prefetchDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import { useSyncAllDataConnections } from "@/features/data-connections/hooks/use-sync-all-data-connections"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("data-connections")

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props

  const queryClient = useQueryClient()

  // Prefetch data providers
  useEffect(() => {
    prefetchDataProviders(queryClient).catch((error) => {
      logger.error(
        new Error("Error prefetching data providers", {
          cause: error,
        })
      )
    })
  }, [queryClient])

  // Sync all connections
  const { syncAllConnections } = useSyncAllDataConnections()
  useEffect(() => {
    // Sync at startup, with a delay to allow the data connections to be fetched
    setTimeout(() => {
      syncAllConnections()
    }, 1000 * 10) // 10 seconds

    // Sync at regular intervals
    const interval = setInterval(() => {
      syncAllConnections()
    }, DATA_CONNECTIONS_SYNC_INTERVAL)

    return () => clearInterval(interval)
  }, [syncAllConnections])

  return <>{children}</>
}
DataConnectionsProvider.displayName = "DataConnectionsProvider"
