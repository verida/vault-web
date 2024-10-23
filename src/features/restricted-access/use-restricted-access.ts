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
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    meta: {
      persist: true,
      logCategory: "restricted-access",
      errorMessage: "Failed to get user access",
    },
  })

  return { access: data, ...query }
}
