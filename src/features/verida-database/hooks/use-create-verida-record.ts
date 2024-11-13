import { useMutation, useQueryClient } from "@tanstack/react-query"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { VeridaRecord } from "@/features/verida-database/types"
import { createVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type CreateRecordArgs<T> = {
  databaseName: string
  record: T
}

export function useCreateVeridaRecord<T = Record<string, unknown>>() {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    VeridaRecord<T>,
    Error,
    CreateRecordArgs<T>
  >({
    mutationFn: async ({ databaseName, record }) => {
      const sessionToken = await getAccountSessionToken()

      return createVeridaDataRecord<T>({
        sessionToken,
        databaseName,
        record,
      })
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecords({
          databaseName: variables.databaseName,
        }),
      })
      queryClient.setQueryData(
        VeridaDatabaseQueryKeys.dataRecord({
          did,
          databaseName: variables.databaseName,
          recordId: data._id,
        }),
        data
      )
    },
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error creating Verida data record",
    },
  })

  return {
    createRecord: mutate,
    createRecordAsync: mutateAsync,
    ...mutation,
  }
}
