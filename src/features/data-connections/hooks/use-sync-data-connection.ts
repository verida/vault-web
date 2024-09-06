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
      const result = await syncDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      )

      return {
        success: result.success,
      }
    },
    onSuccess: async () => {
      const keys = DataConnectionsQueryKeys.invalidateDataConnections()
      logger.debug("Invalidating data connections queries", { keys })
      await queryClient.invalidateQueries({
        queryKey: keys,
      })
      logger.debug("Successfully invalidated data connections queries", {
        keys,
      })
    },
    meta: {
      logCategory: "DataConnections",
      errorMessage: "Error syncing data connection",
    },
  })

  return {
    syncDataConnection: mutateAsync,
    ...mutation,
  }
}
