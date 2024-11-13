import { useMutation, useQueryClient } from "@tanstack/react-query"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { deleteVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type DeleteRecordArgs = {
  databaseName: string
  recordId: string
}

export function useVeridaDeleteRecord() {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({ databaseName, recordId }: DeleteRecordArgs) => {
      const sessionToken = await getAccountSessionToken()
      return deleteVeridaDataRecord({ databaseName, recordId, sessionToken })
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecords({
          databaseName: variables.databaseName,
        }),
      })
      queryClient.removeQueries({
        queryKey: VeridaDatabaseQueryKeys.dataRecord({
          did,
          databaseName: variables.databaseName,
          recordId: variables.recordId,
        }),
      })
    },
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error deleting Verida data record",
    },
  })

  return {
    deleteRecord: mutate,
    deleteRecordAsync: mutateAsync,
    ...mutation,
  }
}
