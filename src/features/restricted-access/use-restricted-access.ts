import { useQuery } from "@tanstack/react-query"

import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { getRestrictedAccessStatus } from "@/features/restricted-access/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

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
    staleTime: 1000 * 60 * 10, // 10 minutes
    meta: {
      // persist: true, // TODO: Uncomment and try to manage the cache for when the result is allowed but with no cache if the result is denied
      logCategory: "restricted-access",
      errorMessage: "Failed to get user access",
    },
  })

  return { access: data, ...query }
}
