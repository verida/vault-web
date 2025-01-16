import { useQuery } from "@tanstack/react-query"

import { getVeridaOauthScopeDefinitions } from "@/features/verida-auth/utils"

export function useVeridaOauthScopeDefinitions() {
  const { data, ...query } = useQuery({
    queryKey: ["verida-oauth-scope-definitions"],
    queryFn: getVeridaOauthScopeDefinitions,
    staleTime: 1000 * 60 * 60, // 1 hours
    meta: {
      logCategory: "verida-oauth",
      errorMessage: "Failed to fetch Verida OAuth scope definitions",
      persist: true,
    },
  })

  return {
    scopeDefinitions: data,
    ...query,
  }
}
