import { useQuery, useQueryClient } from "@tanstack/react-query"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { fetchVeridaDataRecords } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/use-verida"

type UseVeridaDataRecordsArgs<T = Record<string, unknown>> = {
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<T>
  options?: VeridaDatabaseQueryOptions<T>
}

/**
 * Custom hook to fetch Verida data records.
 *
 * @param databaseName - The name of the database to query
 * @param filter - Optional query filter to apply to the records
 * @param options - Optional query parameters (sort, limit, skip)
 * @returns Query result object containing data, loading state, and error state
 */
export function useVeridaDataRecords<T = Record<string, unknown>>({
  databaseName,
  filter,
  options,
}: UseVeridaDataRecordsArgs<T>) {
  const { did, getAccountSessionToken } = useVerida()

  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecords({
      databaseName,
      did,
      filter,
      options,
    }),
    queryFn: async () => {
      const token = await getAccountSessionToken()

      const result = await fetchVeridaDataRecords<T>({
        sessionToken: token,
        databaseName,
        filter,
        options,
      })

      result.records.forEach((record) => {
        queryClient.setQueryData(
          VeridaDatabaseQueryKeys.dataRecord({
            databaseName,
            did,
            recordId: record._id,
          }),
          record
        )
      })

      return result
    },
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error fetching Verida data records",
    },
  })

  return {
    records: data?.records,
    pagination: data?.pagination,
    ...query,
  }
}
