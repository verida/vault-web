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

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: ({
      providerId,
      accountId,
    }: DisconnectDataConnectionVariables) =>
      disconnectDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      ),
    onSettled: () => {
      logger.debug("Invalidating data connections queries")
      queryClient
        .invalidateQueries({
          queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
        })
        .then(() => {
          logger.debug("Successfully invalidated data connections queries")
        })
    },
    meta: {
      logCategory: "DataConnections",
      errorMessage: "Error disconnecting data connection",
    },
  })

  return {
    disconnectDataConnection: mutate,
    disconnectDataConnectionAsync: mutateAsync,
    ...mutation,
  }
}
