import { useQuery } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { SearchType } from "@/features/data-search/types"
import { searchData } from "@/features/data-search/utils"

export function useSearchData(
  searchValue?: string,
  searchTypes?: SearchType[]
) {
  const { data, ...query } = useQuery({
    queryKey: ["data", "search", searchTypes, searchValue],
    enabled: !!searchValue,
    queryFn: () => {
      if (!searchValue) {
        // Should not be happening as enabled is set to false if searchValue is not present
        return []
      }

      return searchData({
        key: commonConfig.PRIVATE_DATA_API_PRIVATE_KEY,
        searchValue,
        searchTypes,
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
