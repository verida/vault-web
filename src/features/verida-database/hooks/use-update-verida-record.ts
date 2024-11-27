import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import {
  FetchVeridaDataRecordsResult,
  VeridaRecord,
} from "@/features/verida-database/types"
import { updateVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UpdateRecordArgs<T extends z.ZodObject<any>> = {
  databaseName: string
  record: VeridaRecord<z.infer<T>>
}

export type UseUpdateVeridaRecordOptions = {
  disableOptimisticUpdate?: boolean
}

export function useUpdateVeridaRecord<T extends z.ZodObject<any>>(
  baseSchema?: T,
  options: UseUpdateVeridaRecordOptions = {}
) {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    VeridaRecord<z.infer<T>>,
    Error,
    UpdateRecordArgs<T>,
    {
      previousRecordData: VeridaRecord<z.infer<T>> | undefined
      previousRecordsData: [
        QueryKey,
        FetchVeridaDataRecordsResult<z.infer<T>> | undefined,
      ][]
    }
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
    onMutate: async ({ databaseName, record }) => {
      if (options.disableOptimisticUpdate) {
        return {
          previousRecordsData: [],
          previousRecordData: undefined,
        }
      }

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecords({
          databaseName,
        }),
      })

      // Snapshot the previous values for all queries matching the data records key
      const previousRecordsData = queryClient.getQueriesData<
        FetchVeridaDataRecordsResult<z.infer<T>>
      >({
        queryKey: VeridaDatabaseQueryKeys.invalidateDataRecords({
          databaseName,
        }),
      })

      // Optimistically update all matching queries
      previousRecordsData.forEach(([queryKey, queryData]) => {
        if (queryData) {
          queryClient.setQueryData(queryKey, {
            ...queryData,
            records: queryData.records.map((r) =>
              r._id === record._id ? { ...r, ...record } : r
            ),
          })
        }
      })

      // Snapshot the previous value for the individual record
      const previousRecordData = queryClient.getQueryData<
        VeridaRecord<z.infer<T>>
      >(
        VeridaDatabaseQueryKeys.dataRecord({
          databaseName,
          did,
          recordId: record._id,
        })
      )

      // Optimistically update to the new value for the individual record
      if (previousRecordData) {
        queryClient.setQueryData(
          VeridaDatabaseQueryKeys.dataRecord({
            databaseName,
            did,
            recordId: record._id,
          }),
          {
            ...previousRecordData,
            ...record,
          }
        )
      }

      // Return a context object with the snapshotted values
      return { previousRecordsData, previousRecordData }
    },
    onError: (_error, { databaseName, record }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back the optimistic updates

      if (context?.previousRecordsData) {
        context.previousRecordsData.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData)
        })
      }

      if (context?.previousRecordData) {
        queryClient.setQueryData(
          VeridaDatabaseQueryKeys.dataRecord({
            databaseName,
            did,
            recordId: record._id,
          }),
          context.previousRecordData
        )
      }
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
