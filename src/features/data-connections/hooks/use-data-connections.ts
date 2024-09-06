import { useQuery } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { getDataConnections } from "@/features/data-connections/utils"
import { useVerida } from "@/features/verida/hooks/useVerida"

export function useDataConnections() {
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: DataConnectionsQueryKeys.dataConnections({ did }),
    queryFn: () =>
      getDataConnections(commonConfig.PRIVATE_DATA_API_PRIVATE_KEY),
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
