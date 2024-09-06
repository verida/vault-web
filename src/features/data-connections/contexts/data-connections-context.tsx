"use client"

import { useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useEffect, useMemo, useRef } from "react"

import { DATA_CONNECTIONS_CHANNEL } from "@/features/data-connections/constants"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { DataConnectionsChannelEvent } from "@/features/data-connections/types"
import { Logger } from "@/features/telemetry"
import { StrictBroadcastChannel } from "@/types/strict-broadcast-channel"

const logger = Logger.create("DataConnectionsContext")

export type DataConnectionsContextValue = {
  triggerNewDataConnectionEvent: ({
    connectionId,
  }: {
    connectionId?: string // TODO: Make connectionId required when available
  }) => void
  broadcastChannel: StrictBroadcastChannel<DataConnectionsChannelEvent>
}

export const DataConnectionsContext =
  createContext<DataConnectionsContextValue | null>(null)

export type DataConnectionsProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsProvider(props: DataConnectionsProviderProps) {
  const { children } = props
  const queryClient = useQueryClient()
  const broadcastChannelRef = useRef<
    StrictBroadcastChannel<DataConnectionsChannelEvent>
  >(new BroadcastChannel(DATA_CONNECTIONS_CHANNEL))

  const triggerNewDataConnectionEvent = useCallback(
    ({ connectionId }: { connectionId?: string }) => {
      logger.info("Triggering new data connection event")

      broadcastChannelRef.current.postMessage({
        type: "new-data-connection",
        payload: {
          connectionId,
        },
      })
    },
    []
  )

  const handleNewDataConnection = useCallback(
    (event: MessageEvent<DataConnectionsChannelEvent>) => {
      const { type } = event.data
      if (type !== "new-data-connection") {
        return
      }

      logger.info("New data connection event received")

      logger.debug("Invalidating data connections queries")
      queryClient.invalidateQueries({
        queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
      })
    },
    [queryClient]
  )

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
