import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import { getVeridaDataRecord } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UseVeridaDataRecordArgs<T extends z.ZodObject<any>> = {
  databaseName: string
  recordId: string
  baseSchema?: T
}

/**
 * Custom hook to fetch a single Verida data record.
 *
 * @param params - Hook parameters
 * @param params.databaseName - The name of the database to query
 * @param params.recordId - The ID of the record to fetch
 * @param params.baseSchema - Optional base schema to extend the record with
 * @returns Query result object containing data, loading state, and error state
 */
export function useVeridaDataRecord<T extends z.ZodObject<any>>({
  databaseName,
  recordId,
  baseSchema,
}: UseVeridaDataRecordArgs<T>) {
  const { did, getAccountSessionToken } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecord({
      databaseName,
      did,
      recordId,
    }),
    queryFn: async () => {
      const token = await getAccountSessionToken()
      return getVeridaDataRecord<T>({
        sessionToken: token,
        databaseName,
        recordId,
        baseSchema,
      })
    },
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error fetching Verida data record",
    },
  })

  return { record: data, ...query }
}
