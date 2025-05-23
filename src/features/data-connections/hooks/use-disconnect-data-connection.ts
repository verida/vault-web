import { useMutation, useQueryClient } from "@tanstack/react-query"

import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { disconnectDataConnection } from "@/features/data-connections/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { wait } from "@/utils/misc"

type DisconnectDataConnectionArgs = {
  connectionId: string
}

export function useDisconnectDataConnection() {
  const { getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({ connectionId }: DisconnectDataConnectionArgs) => {
      const sessionToken = await getAccountSessionToken()
      return disconnectDataConnection(connectionId, sessionToken)
    },
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
      logCategory: "data-connections",
      errorMessage: "Error disconnecting data connection",
    },
  })

  return {
    disconnectDataConnection: mutate,
    disconnectDataConnectionAsync: mutateAsync,
    ...mutation,
  }
}
