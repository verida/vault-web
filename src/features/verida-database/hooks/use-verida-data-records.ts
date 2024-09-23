import { useQuery, useQueryClient } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { fetchVeridaDataRecords } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks"

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
  const { did } = useVerida()

  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecords({
      databaseName,
      did,
      filter,
      options,
    }),
    queryFn: async () => {
      const result = await fetchVeridaDataRecords<T>({
        key: commonConfig.PRIVATE_DATA_API_PRIVATE_KEY,
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
    // TODO: Set staleTime?
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "VeridaDatabase",
      errorMessage: "Error fetching Verida data records",
    },
  })

  return {
    records: data?.records,
    pagination: data?.pagination,
    ...query,
  }
}
