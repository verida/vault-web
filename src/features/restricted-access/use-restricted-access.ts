import { useQuery } from "@tanstack/react-query"

import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { getRestrictedAccessStatus } from "@/features/restricted-access/utils"
import { useVerida } from "@/features/verida/use-verida"

export function useRestrictedAccess() {
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: ["restricted-access", "status", did],
    queryFn: async (): Promise<RestrictedAccessStatus> => {
      if (!did) {
        return "denied"
      }
      return getRestrictedAccessStatus(did)
    },
    enabled: !!did,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    meta: {
      logCategory: "restricted-access",
      errorMessage: "Failed to get user access",
    },
    // TODO: Add persistence to the query
  })

  return { access: data, ...query }
}
