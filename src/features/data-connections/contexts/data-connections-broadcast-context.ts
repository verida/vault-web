import { createContext } from "react"

import type { DataConnectionsChannelEvent } from "@/features/data-connections/types"
import { type StrictBroadcastChannel } from "@/types/strict-broadcast-channel"

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
