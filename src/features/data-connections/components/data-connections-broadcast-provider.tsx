"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useRef } from "react"

import { DATA_CONNECTIONS_CHANNEL } from "@/features/data-connections/constants"
import {
  DataConnectionsBroadcastContext,
  DataConnectionsBroadcastContextValue,
} from "@/features/data-connections/contexts/data-connections-broadcast-context"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { DataConnectionsChannelEvent } from "@/features/data-connections/types"
import { Logger } from "@/features/telemetry"
import { StrictBroadcastChannel } from "@/types/strict-broadcast-channel"

const logger = Logger.create("data-connections")

export type DataConnectionsBroadcastProviderProps = {
  children: React.ReactNode
}

export function DataConnectionsBroadcastProvider(
  props: DataConnectionsBroadcastProviderProps
) {
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
      queryClient
        .invalidateQueries({
          queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
        })
        .then(() => {
          logger.info("Successfully invalidated data connections queries")
        })
    },
    [queryClient]
  )

  useEffect(() => {
    const controller = new AbortController()

    broadcastChannelRef.current.addEventListener(
      "message",
      handleNewDataConnection,
      {
        signal: controller.signal,
      }
    )
    return () => {
      controller.abort()
    }
  }, [handleNewDataConnection])

  const contextValue: DataConnectionsBroadcastContextValue = useMemo(
    () => ({
      triggerNewDataConnectionEvent,
      broadcastChannel: broadcastChannelRef.current,
    }),
    [triggerNewDataConnectionEvent]
  )

  return (
    <DataConnectionsBroadcastContext.Provider value={contextValue}>
      {children}
    </DataConnectionsBroadcastContext.Provider>
  )
}
DataConnectionsBroadcastProvider.displayName =
  "DataConnectionsBroadcastProvider"
