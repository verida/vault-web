import { useQuery } from "@tanstack/react-query"

import { DataConnectionsQueryKeys } from "@/features/data-connections/queries"
import { getDataProviders } from "@/features/data-connections/utils"

export function useDataProviders() {
  const { data, ...query } = useQuery({
    queryKey: DataConnectionsQueryKeys.dataProviders(),
    queryFn: getDataProviders,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    meta: {
      logCategory: "DataConnections",
    },
  })

  return {
    providers: data,
    ...query,
  }
}
