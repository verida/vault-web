import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { syncDataConnection } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida"
import { wait } from "@/utils/misc"

const logger = Logger.create("data-connections")

type SyncDataConnectionVariables = {
  connectionId: string
}

export function useSyncDataConnection() {
  const { getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const invalidateDataConnectionsQueries = useCallback(() => {
    logger.debug("Invalidating data connections queries")
    queryClient
      .invalidateQueries({
        queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
      })
      .then(() => {
        logger.debug("Successfully invalidated data connections queries")
      })
  }, [queryClient])

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({ connectionId }: SyncDataConnectionVariables) => {
      const sessionToken = await getAccountSessionToken()
      return syncDataConnection(connectionId, sessionToken)
    },
    onMutate: () => {
      // Give time for the data connection to be updated on the server
      wait(1000 * 2).then(() => {
        // Invalidate the data connections to fetch the updated status just
        // after starting the sync
        invalidateDataConnectionsQueries()
      })
    },
    meta: {
      logCategory: "data-connections",
      errorMessage: "Error syncing data connection",
      onSettledInvalidationQueryKeys:
        DataConnectionsQueryKeys.invalidateDataConnections(),
    },
  })

  return {
    syncDataConnection: mutate,
    syncDataConnectionAsync: mutateAsync,
    ...mutation,
  }
}
