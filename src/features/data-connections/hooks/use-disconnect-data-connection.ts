import { useMutation, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { disconnectDataConnection } from "@/features/data-connections/utils"
import { wait } from "@/utils/misc"

type DisconnectDataConnectionVariables = {
  connectionId: string
}

export function useDisconnectDataConnection() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: ({ connectionId }: DisconnectDataConnectionVariables) =>
      disconnectDataConnection(
        connectionId,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      ),
    onSuccess: () => {
      wait(1000).then(() => {
        // Putting a timer to leave time for the other mutation onSuccess hook
        // to update the UI
        queryClient.invalidateQueries({
          queryKey: DataConnectionsQueryKeys.invalidateDataConnections(),
        })
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
