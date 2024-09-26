"use client"

import { createContext } from "react"

import { DataConnectionsChannelEvent } from "@/features/data-connections/types"
import { StrictBroadcastChannel } from "@/types/strict-broadcast-channel"

export type DataConnectionsBroadcastContextValue = {
  triggerNewDataConnectionEvent: ({
    connectionId,
  }: {
    connectionId?: string
  }) => void
  broadcastChannel: StrictBroadcastChannel<DataConnectionsChannelEvent>
}

export const DataConnectionsBroadcastContext =
  createContext<DataConnectionsBroadcastContextValue | null>(null)
