import { useMemo } from "react"

import { useDataConnections } from "@/features/data-connections/hooks/useDataConnections"

export function useDataConnection(connectionName: string) {
  const { connections, ...query } = useDataConnections()

  const connection = useMemo(
    () => connections?.find((connection) => connection.name === connectionName),
    [connections, connectionName]
  )

  return {
    connection,
    ...query,
  }
}
