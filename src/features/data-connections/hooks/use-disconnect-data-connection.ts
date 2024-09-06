import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { disconnectDataConnection } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("DataConnections")

type DisconnectDataConnectionVariables = {
  providerId: string
  accountId: string
}

export function useDisconnectDataConnection() {
  const queryClient = useQueryClient()

  const { mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({
      providerId,
      accountId,
    }: DisconnectDataConnectionVariables) => {
      logger.debug("Disconnecting data connection", { providerId })
      const success = await disconnectDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      )
      logger.debug("Successfully disconnected data connection", { providerId })

      return { success }
    },
    onSuccess: () => {
      logger.debug("Invalidating data connections queries")
      queryClient
        .invalidateQueries({
          queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
        })
        .then(() => {
          logger.debug("Successfully invalidated data conenctions queries")
        })
    },
    onError: (error) => {
      logger.error(
        new Error("Error disconnecting data connection", {
          cause: error,
        })
      )
    },
    meta: {
      logCategory: "DataConnections",
    },
  })

  return {
    disconnectDataConnection: mutateAsync,
    ...mutation,
  }
}
