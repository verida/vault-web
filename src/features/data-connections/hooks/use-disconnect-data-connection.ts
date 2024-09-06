import { useMutation } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { disconnectDataConnection } from "@/features/data-connections/utils"

type DisconnectDataConnectionVariables = {
  providerId: string
  accountId: string
}

export function useDisconnectDataConnection() {
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
    meta: {
      logCategory: "DataConnections",
      errorMessage: "Error disconnecting data connection",
      onSettledInvalidationQueryKeys:
        DataConnectionsQueryKeys.invalidateDataConnections(),
    },
  })

  return {
    disconnectDataConnection: mutate,
    disconnectDataConnectionAsync: mutateAsync,
    ...mutation,
  }
}
