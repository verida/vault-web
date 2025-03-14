import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import type {
  UnsavedVeridaRecord,
  VeridaRecord,
} from "@/features/verida-database/types"
import { createVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type CreateRecordArgs<T extends z.ZodObject<any>> = {
  databaseName: string
  record: UnsavedVeridaRecord<z.infer<T>>
}

export function useCreateVeridaRecord<T extends z.ZodObject<any>>(
  baseSchema?: T
) {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  // TODO: Add optimistic update

  const { mutate, mutateAsync, ...mutation } = useMutation<
    VeridaRecord<z.infer<T>>,
    Error,
    CreateRecordArgs<T>
  >({
    mutationFn: async ({ databaseName, record }) => {
      const sessionToken = await getAccountSessionToken()

      return createVeridaDataRecord<T>({
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
      errorMessage: "Error creating Verida record",
    },
  })

  return {
    createRecord: mutate,
    createRecordAsync: mutateAsync,
    ...mutation,
  }
}
