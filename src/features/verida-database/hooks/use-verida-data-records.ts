import { useQuery } from "@tanstack/react-query"

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
 * Custom hook to fetch and manage Verida data records.
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

  const { ...query } = useQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecords({
      databaseName,
      did,
      filter,
      options,
    }),
    queryFn: () => {
      // TODO: Populate the data record cache with the result

      return fetchVeridaDataRecords<T>({
        key: commonConfig.PRIVATE_DATA_API_PRIVATE_KEY,
        databaseName,
        filter,
        options,
      })
    },
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "VeridaDatabase",
      errorMessage: "Error fetching Verida data records",
    },
  })

  return { ...query }
}
