"use client"

import { useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useEffect, useMemo, useRef } from "react"

import { Logger } from "@/features/telemetry"

const logger = Logger.create("DataConnectionsContext")

export const NEW_CONNECTION_EVENT = "new-data-connection"

export type DataConnectionsContextValue = {
  triggerNewDataConnectionEvent: () => void
  broadcastChannel: BroadcastChannel
}

export const DataConnectionsContext =
  createContext<DataConnectionsContextValue | null>(null)

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props
  const queryClient = useQueryClient()
  const broadcastChannelRef = useRef(new BroadcastChannel(NEW_CONNECTION_EVENT))

  const triggerNewDataConnectionEvent = useCallback(() => {
    logger.info("Triggering new data connection event")

    const event = {
      // TODO: Type the event once consumed
      message: "new data connection",
      // Pass the connectionId in the event if available from where it's triggered
    }

    broadcastChannelRef.current.postMessage(event)
  }, [])

  const handleNewDataConnection = useCallback(() => {
    logger.info("New data connection event received")

    logger.debug("Invalidating data connections queries")
    queryClient.invalidateQueries({
      queryKey: ["data-connections", "connections"],
    })
  }, [queryClient])

  useEffect(() => {
    const broadcastChannel = broadcastChannelRef.current
    broadcastChannel.addEventListener("message", handleNewDataConnection)
    return () => {
      broadcastChannel.removeEventListener("message", handleNewDataConnection)
    }
  }, [handleNewDataConnection])

  const contextValue = useMemo(
    () => ({
      triggerNewDataConnectionEvent,
      broadcastChannel: broadcastChannelRef.current,
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
