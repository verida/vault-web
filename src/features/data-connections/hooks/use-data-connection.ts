import { useMemo } from "react"

import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"

export function useDataConnection(connectionName: string) {
  const { connections, ...query } = useDataConnections()

  const connection = useMemo(
    () => connections?.find((connection) => connection._id === connectionName),
    [connections, connectionName]
  )

  return {
    connection,
    ...query,
  }
}
