import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { VeridaRecord } from "@/features/verida-database/types"
import { updateVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UpdateRecordArgs<T extends z.ZodObject<any>> = {
  databaseName: string
  record: VeridaRecord<z.infer<T>>
}

export function useUpdateVeridaRecord<T extends z.ZodObject<any>>(
  baseSchema?: T
) {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    VeridaRecord<z.infer<T>>,
    Error,
    UpdateRecordArgs<T>
  >({
    mutationFn: async ({ databaseName, record }) => {
      const sessionToken = await getAccountSessionToken()

      return updateVeridaDataRecord<T>({
        sessionToken,
        databaseName,
        record,
        baseSchema,
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
      errorMessage: "Error updating Verida record",
    },
  })

  return {
    updateRecord: mutate,
    updateRecordAsync: mutateAsync,
    ...mutation,
  }
}
