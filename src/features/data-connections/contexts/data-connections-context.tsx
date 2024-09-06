"use client"

import { useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useEffect, useMemo } from "react"

import { Logger } from "@/features/telemetry"

const logger = Logger.create("DataConnectionsContext")

export const NEW_CONNECTION_EVENT = "new-data-connection"
const broadcastChannel = new BroadcastChannel(NEW_CONNECTION_EVENT)

export type DataConnectionsContextValue = {
  triggerNewDataConnectionEvent: () => void
}

export const DataConnectionsContext =
  createContext<DataConnectionsContextValue | null>(null)

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props
  const queryClient = useQueryClient()

  const triggerNewDataConnectionEvent = useCallback(() => {
    logger.info("Triggering new data connection event")

    const event = {
      // TODO: Type the event once consumed
      message: "new data connection",
    }

    broadcastChannel.postMessage(event)
  }, [])

  const handleNewDataConnection = useCallback(() => {
    logger.info("New data connection event received")

    logger.debug("Invalidating data connections queries")
    queryClient.invalidateQueries({
      queryKey: ["data-connections", "connections"],
    })
  }, [queryClient])

  useEffect(() => {
    broadcastChannel.addEventListener("message", handleNewDataConnection)
    return () => {
      broadcastChannel.removeEventListener("message", handleNewDataConnection)
    }
  }, [handleNewDataConnection])

  const contextValue = useMemo(
    () => ({
      triggerNewDataConnectionEvent,
    }),
    [triggerNewDataConnectionEvent]
  )

  return (
    <DataConnectionsContext.Provider value={contextValue}>
      {children}
    </DataConnectionsContext.Provider>
  )
}
DataConnectionsProvider.displayName = "DataConnectionsProvider"
