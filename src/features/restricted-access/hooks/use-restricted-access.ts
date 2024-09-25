import { useQuery } from "@tanstack/react-query"

import { getUserAccess } from "@/features/restricted-access/utils"
import { useVerida } from "@/features/verida"

export function useRestrictedAccess() {
  const { did } = useVerida()

  const { data: access } = useQuery({
    queryKey: ["restricted-access", did],
    queryFn: () => getUserAccess(did),
    enabled: !!did,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    meta: {
      errorMessage: "Failed to get user access",
      logCategory: "restricted-access",
    },
  })

  return { access }
}
