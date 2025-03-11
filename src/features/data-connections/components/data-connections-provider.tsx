"use client"

import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useEffect } from "react"

import { prefetchDataProviders } from "@/features/data-connections/hooks/use-data-providers"
import { Logger } from "@/features/telemetry/logger"

const logger = Logger.create("data-connections")

export interface DataConnectionsProviderProps {
  children: ReactNode
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

  return <>{children}</>
}
DataConnectionsProvider.displayName = "DataConnectionsProvider"
