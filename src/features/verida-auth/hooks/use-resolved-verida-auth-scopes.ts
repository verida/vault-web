import { useQuery } from "@tanstack/react-query"

import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import { resolveVeridaAuthScopes } from "@/features/verida-auth/utils"

export function useResolvedVeridaAuthScopes(scopes: string[]) {
  const { data, ...query } = useQuery({
    enabled: scopes.length > 0,
    queryKey: VeridaAuthQueryKeys.resolveScopes(scopes),
    queryFn: () => resolveVeridaAuthScopes(scopes),
    staleTime: 1000 * 60 * 60, // 1 hours
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Failed to resolve Verida Auth scopes",
      persist: true,
    },
  })

  return {
    resolvedScopes: data?.resolvedScopes,
    scopeValidity: data?.scopeValidity,
    ...query,
  }
}
