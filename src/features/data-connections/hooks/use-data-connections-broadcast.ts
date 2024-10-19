import { useContext } from "react"

import { DataConnectionsBroadcastContext } from "@/features/data-connections/data-connections-broadcast-context"

export function useDataConnectionsBroadcast() {
  const context = useContext(DataConnectionsBroadcastContext)
  if (!context) {
    throw new Error(
      "useDataConnectionsBroadcast must be used within a DataConnectionsBroadcastProvider"
    )
  }
  return context
}
