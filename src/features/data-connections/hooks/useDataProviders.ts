import { useQuery } from "@tanstack/react-query"

import { getDataProviders } from "@/features/data-connections/utils"

export function useDataProviders() {
  const { data, ...query } = useQuery({
    queryKey: ["data-connections", "providers"],
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
