import { useQuery } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { getDataConnections } from "@/features/data-connections/utils"
import { useVerida } from "@/features/verida/hooks/useVerida"

export function useDataConnections() {
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: ["data-connections", did, "connections"],
    queryFn: () =>
      getDataConnections(commonConfig.PRIVATE_DATA_API_PRIVATE_KEY),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "DataConnections",
    },
  })

  return {
    connections: data,
    ...query,
  }
}
