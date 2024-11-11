import { useMutation, useQueryClient } from "@tanstack/react-query"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { destroyVeridaDatabase } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type DestroyDatabaseVariables = {
  databaseName: string
}

export function useVeridaDestroyDatabase() {
  const { getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({ databaseName }: DestroyDatabaseVariables) => {
      const sessionToken = await getAccountSessionToken()
      return destroyVeridaDatabase({ databaseName, sessionToken })
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecords({
          databaseName: variables.databaseName,
        }),
      })
      queryClient.removeQueries({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecord({
          databaseName: variables.databaseName,
        }),
      })
    },
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error destroying Verida database",
    },
  })

  return {
    destroyDatabase: mutate,
    destroyDatabaseAsync: mutateAsync,
    ...mutation,
  }
}
