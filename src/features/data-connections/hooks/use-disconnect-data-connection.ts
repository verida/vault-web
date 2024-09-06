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
      const success = await disconnectDataConnection(
        providerId,
        accountId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      )

      return { success }
    },
    onSuccess: async () => {
      const keys = DataConnectionsQueryKeys.invalidateDataConnections()
      logger.debug("Invalidating data connections queries", { keys })
      await queryClient.invalidateQueries({
        queryKey: keys,
      })
      logger.debug("Successfully invalidated data conenctions queries", {
        keys,
      })
    },
    meta: {
      logCategory: "DataConnections",
      errorMessage: "Error disconnecting data connection",
    },
  })

  return {
    disconnectDataConnection: mutateAsync,
    ...mutation,
  }
}
