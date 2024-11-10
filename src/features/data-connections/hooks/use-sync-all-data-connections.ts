import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { syncAllDataConnections } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry/logger"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { wait } from "@/utils/misc"

const logger = Logger.create("data-connections")

export function useSyncAllDataConnections() {
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
    mutationFn: async () => {
      const sessionToken = await getAccountSessionToken()
      return syncAllDataConnections(sessionToken)
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
      errorMessage: "Error syncing all data connections",
      onSettledInvalidationQueryKeys:
        DataConnectionsQueryKeys.invalidateDataConnections(),
    },
  })

  return {
    syncAllConnections: mutate,
    syncAllConnectionsAsync: mutateAsync,
    ...mutation,
  }
}
