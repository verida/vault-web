"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import {
  prefetchDataConnections,
  prefetchDataProviders,
} from "@/features/data-connections/hooks"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida"

const logger = Logger.create("data-connections")

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props

  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  useEffect(() => {
    // No need to catch, prefetch doesn't throw errors
    prefetchDataProviders(queryClient).catch((error) => {
      logger.error(
        new Error("Error prefetching data providers", {
          cause: error,
        })
      )
    })

    // No need to catch, prefetch doesn't throw errors
    getAccountSessionToken()
      .then((token) => prefetchDataConnections(queryClient, did, token))
      .catch((error) => {
        logger.error(
          new Error("Error prefetching data connections", {
            cause: error,
          })
        )
      })
  }, [queryClient, did, getAccountSessionToken])

  return <>{children}</>
}
DataConnectionsProvider.displayName = "DataConnectionsProvider"
