import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { z } from "zod"

import type { UseQueryOptions } from "@/features/queries/types"
import { Logger } from "@/features/telemetry/logger"
import { VeridaDatabaseQueryKeys } from "@/features/verida-database/queries"
import type {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
  VeridaRecord,
} from "@/features/verida-database/types"
import { getVeridaDataRecords } from "@/features/verida-database/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-database")

export type UseVeridaDataRecordsArgs<T extends z.ZodObject<any>> = {
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<VeridaRecord<z.infer<T>>>
  options?: VeridaDatabaseQueryOptions<VeridaRecord<z.infer<T>>>
  baseSchema?: T
}

/**
 * Custom hook to fetch Verida data records.
 *
 * @param params - Hook parameters
 * @param params.databaseName - The name of the database to query
 * @param params.filter - Optional query filter to apply to the records
 * @param params.options - Optional query parameters (sort, limit, skip)
 * @param params.baseSchema - Optional base schema to extend the records with
 * @param queryOptions - Query options
 * @returns Query result object containing data, loading state, and error state
 */
export function useVeridaDataRecords<T extends z.ZodObject<any>>(
  { databaseName, filter, options, baseSchema }: UseVeridaDataRecordsArgs<T>,
  queryOptions?: UseQueryOptions
) {
  const { did, getAccountSessionToken } = useVerida()

  const queryClient = useQueryClient()

  const queryKey = useMemo(
    () =>
      VeridaDatabaseQueryKeys.dataRecords({
        databaseName,
        did,
        filter,
        options,
      }),
    [databaseName, did, filter, options]
  )

  const { data, ...query } = useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAccountSessionToken()

      const result = await getVeridaDataRecords<T>({
        sessionToken: token,
        databaseName,
        filter,
        options,
        baseSchema,
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
    enabled: queryOptions?.enabled,
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 1, // 1 minute
    gcTime: queryOptions?.gcTime ?? 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "verida-database",
      errorMessage: "Error fetching Verida data records",
    },
  })

  return {
    records: data?.records,
    pagination: data?.pagination,
    queryKey,
    ...query,
  }
}

export type PrefetchVeridaDataRecordsArgs<T extends z.ZodObject<any>> = {
  queryClient: QueryClient
  did: string
  sessionToken: string
  databaseName: string
  filter?: VeridaDatabaseQueryFilter<VeridaRecord<z.infer<T>>>
  options?: VeridaDatabaseQueryOptions<VeridaRecord<z.infer<T>>>
  baseSchema?: T
}

export async function prefetchVeridaDataRecords<T extends z.ZodObject<any>>({
  queryClient,
  did,
  sessionToken,
  databaseName,
  filter,
  options,
  baseSchema,
}: PrefetchVeridaDataRecordsArgs<T>) {
  logger.info("Prefetching Verida data records")
  await queryClient.prefetchQuery({
    queryKey: VeridaDatabaseQueryKeys.dataRecords({
      databaseName,
      did,
      filter,
      options,
    }),
    queryFn: async () => {
      const result = await getVeridaDataRecords<T>({
        sessionToken,
        databaseName,
        filter,
        options,
        baseSchema,
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
  })
}
