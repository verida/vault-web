import { useQuery } from "@tanstack/react-query"

import { searchData } from "@/features/data-search/utils"
import { useVerida } from "@/features/verida/use-verida"

export function useSearchData(searchValue?: string) {
  const { getAccountSessionToken } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: ["searchData", searchValue],
    enabled: !!searchValue,
    queryFn: async () => {
      if (!searchValue) {
        // Should not be happening as enabled is set to false if searchValue is not present
        return []
      }

      const sessionToken = await getAccountSessionToken()
      return searchData({
        sessionToken,
        searchValue,
      })
    },
    staleTime: 1000 * 10, // 10 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      logCategory: "search-data",
      errorMessage: "Error searching data",
    },
  })

  return {
    items: data,
    ...query,
  }
}
