import { useQuery } from "@tanstack/react-query"

import { getVeridaAuthScopeDefinitions } from "@/features/verida-auth/utils"

export function useVeridaAuthScopeDefinitions() {
  const { data, ...query } = useQuery({
    queryKey: ["verida-auth-scope-definitions"],
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
