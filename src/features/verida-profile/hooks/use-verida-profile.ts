import { QueryClient, useQuery } from "@tanstack/react-query"

import { Logger } from "@/features/telemetry/logger"
import { VeridaProfileQueryKeys } from "@/features/verida-profile/queries"
import {
  getAnyVeridaProfile,
  getVeridaProfileFromContext,
} from "@/features/verida-profile/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-profile")

type UseVeridaProfileArgs = {
  did: string | null | undefined
  enabled?: boolean
}

export function useVeridaProfile({
  did,
  enabled = true,
}: UseVeridaProfileArgs) {
  const { did: currentUserDid, context } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: VeridaProfileQueryKeys.profile(did),
    enabled: !!did && enabled,
    queryFn: () => {
      if (!did) {
        // To satisfy the type checker
        // Should not happen as the hook is disabled if !did
        throw new Error("DID is required")
      }

      if (currentUserDid === did && !!context) {
        return getVeridaProfileFromContext({
          context,
        })
      }

      return getAnyVeridaProfile({
        did,
      })
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
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

export async function invalidateVeridaProfile(
  queryClient: QueryClient,
  did: string
) {
  await queryClient.invalidateQueries({
    queryKey: VeridaProfileQueryKeys.invalidateProfile(did),
  })
  logger.info("Successfully invalidated Verida profile queries")
}
