import { QueryClient, useQuery } from "@tanstack/react-query"

import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { getDataConnections } from "@/features/data-connections/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida/hooks/useVerida"

const logger = Logger.create("DataConnections")

export function useDataConnections() {
  const { did, getAccountSessionToken } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: DataConnectionsQueryKeys.dataConnections({ did }),
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()
      return getDataConnections(sessionToken)
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    // TODO: Can increase the stale time once the status is fetched separately
    // as the connections definition won't change much unless mutated which can
    // invalidate the cache
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "DataConnections",
      errorMessage: "Error fetching data connections",
    },
  })

  return {
    connections: data,
    ...query,
  }
}

export async function prefetchDataConnections(
  queryClient: QueryClient,
  did: string | null,
  sessionToken: string
) {
  if (!did) {
    return
  }

  logger.info("Prefetching data connections")
  await queryClient.prefetchQuery({
    queryKey: DataConnectionsQueryKeys.dataConnections({ did }),
    queryFn: async () => {
      return getDataConnections(sessionToken)
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    // TODO: Can increase the stale time once the status is fetched separately
    // as the connections definition won't change much unless mutated which can
    // invalidate the cache
    gcTime: 1000 * 60 * 30, // 30 minutes
  })
}
