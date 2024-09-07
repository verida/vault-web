import { useContext } from "react"

import { DataConnectionsContext } from "@/features/data-connections/contexts"

export function useDataConnectionsContext() {
  const context = useContext(DataConnectionsContext)
  if (!context) {
    throw new Error(
      "useDataConnectionsContext must be used within a DataConnectionsProvider"
    )
  }
  return context
}
