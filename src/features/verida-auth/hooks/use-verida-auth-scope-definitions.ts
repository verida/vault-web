import { useQuery } from "@tanstack/react-query"

import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import { getVeridaAuthScopeDefinitions } from "@/features/verida-auth/utils"

export function useVeridaAuthScopeDefinitions() {
  const { data, ...query } = useQuery({
    queryKey: VeridaAuthQueryKeys.scopeDefinitions(),
    queryFn: getVeridaAuthScopeDefinitions,
    staleTime: 1000 * 60 * 60, // 1 hours
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Failed to fetch Verida Auth scope definitions",
      persist: true,
    },
  })

  return {
    scopeDefinitions: data,
    ...query,
  }
}
