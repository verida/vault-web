import { useMutation } from "@tanstack/react-query"

import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { useSyncDataConnection } from "@/features/data-connections/hooks/use-sync-data-connection"

export function useSyncAllDataConnections() {
  const { syncDataConnection } = useSyncDataConnection()

  const { connections } = useDataConnections()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async () => {
      if (!connections || connections.length === 0) {
        return
      }

      await Promise.allSettled(
        connections.map((connection) => {
          return syncDataConnection({ connectionId: connection._id })
        })
      )
    },
    meta: {
      logCategory: "data-connections",
      errorMessage: "Error syncing all data connections",
    },
  })

  return {
    syncAllConnections: mutate,
    syncAllConnectionsAsync: mutateAsync,
    ...mutation,
  }
}
