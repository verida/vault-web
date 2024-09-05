import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
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
      logger.debug("Successfully synced data connection")

      logger.debug("Invalidating data connections queries")
      await queryClient.invalidateQueries({
        queryKey: ["data-connections", "connections"],
      })
      logger.debug("Successfully invalidated queries")

      return {
        success: result.success,
      }
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
