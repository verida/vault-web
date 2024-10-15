import { useQuery } from "@tanstack/react-query"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { fetchVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks"

type UseVeridaDataRecordArgs = {
  databaseName: string
  recordId: string
}

/**
 * Custom hook to fetch a single Verida data record.
 *
 * @param databaseName - The name of the database to query
 * @param recordId - The ID of the record to fetch
 * @returns Query result object containing data, loading state, and error state
 */
export function useVeridaDataRecord<T = Record<string, unknown>>({
  databaseName,
  recordId,
}: UseVeridaDataRecordArgs) {
  const { did, getAccountSessionToken } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecord({
      databaseName,
      did,
      recordId,
    }),
    queryFn: async () => {
      const token = await getAccountSessionToken()
      return fetchVeridaDataRecord<T>({
        sessionToken: token,
        databaseName,
        recordId,
      })
    },
    // TODO: Set staleTime?
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "VeridaDatabase",
      errorMessage: "Error fetching Verida data record",
    },
  })

  return { record: data, ...query }
}
