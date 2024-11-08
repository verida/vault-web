import { useQuery } from "@tanstack/react-query"

import { commonConfig } from "@/config/common"
import { fetchPublicProfileFromApi } from "@/features/verida-profile/utils"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"

export function useVeridaProfile(did: string | null | undefined) {
  const { data, ...query } = useQuery({
    queryKey: ["profile", did],
    queryFn: () => {
      if (!did) {
        // To satisfy the type checker
        // Should not happen as the hook is disabled if !did
        throw new Error("DID is required")
      }
      return fetchPublicProfileFromApi({
        did,
        network: commonConfig.VERIDA_NETWORK,
        contextName: VERIDA_VAULT_CONTEXT_NAME,
      })
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!did,
    meta: {
      persist: true,
      logCategory: "verida-profile",
      errorMessage: "Failed to fetch Verida profile",
    },
  })

  return {
    profile: data,
    ...query,
  }
}
