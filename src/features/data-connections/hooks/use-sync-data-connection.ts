import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { syncDataConnection } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("DataConnections")

type SyncDataConnectionVariables = {
  providerId: string
  accountId: string
}

export function useSyncDataConnection() {
  const queryClient = useQueryClient()

  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({
      providerId,
      accountId,
    }: SyncDataConnectionVariables) => {
      logger.debug("Syncing data connection", { providerId })
      const result = await syncDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      )
      logger.debug("Successfully synced data connection", { providerId })

      return {
        success: result.success,
      }
    },
    onSuccess: () => {
      logger.debug("Invalidating data connections queries")
      queryClient
        .invalidateQueries({
          queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
        })
        .then(() => {
          logger.debug("Successfully invalidated data connections queries")
        })
    },
    onError: (error) => {
      logger.error(
        new Error("Error syncing data connection", {
          cause: error,
        })
      )
    },
    meta: {
      logCategory: "DataConnections",
    },
  })

  return {
    syncDataConnection: mutateAsync,
    ...mutation,
  }
}
