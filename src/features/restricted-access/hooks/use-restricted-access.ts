import { useQuery } from "@tanstack/react-query"

import { RestrictedAccessStatus } from "@/features/restricted-access/types"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida"

const logger = Logger.create("restricted-access")

export function useRestrictedAccess() {
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: ["restricted-access", "status", did],
    queryFn: async (): Promise<RestrictedAccessStatus> => {
      if (!did) {
        return "denied"
      }

      const response = await fetch(`/api/restricted-access?did=${did}`)
      if (!response.ok) {
        logger.error(new Error("Failed to fetch user access"))
        return "denied"
      }

      const data = await response.json()
      return data.access
    },
    enabled: !!did,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    meta: {
      errorMessage: "Failed to get user access",
      logCategory: "restricted-access",
    },
    // TODO: Add persistence to the query
  })

  return { access: data, ...query }
}
