import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { syncDataConnection } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry"
import { wait } from "@/utils/misc"

const logger = Logger.create("DataConnections")

type SyncDataConnectionVariables = {
  providerId: string
  accountId: string
}

export function useSyncDataConnection() {
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
    mutationFn: ({ providerId, accountId }: SyncDataConnectionVariables) =>
      syncDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      ),
    onMutate: () => {
      // Give time for the data connection to be updated on the server
      wait(1000 * 2).then(() => {
        // Invalidate the data connections to fetch the updated status just
        // after starting the sync
        invalidateDataConnectionsQueries()
      })
    },
    meta: {
      logCategory: "DataConnections",
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
