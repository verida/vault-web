import { QueryClient, useQuery } from "@tanstack/react-query"
import { Network } from "@verida/types"

import { commonConfig } from "@/config/common"
import { Logger } from "@/features/telemetry/logger"
import { VeridaProfileQueryKeys } from "@/features/verida-profile/queries"
import {
  getVeridaProfileFromClient,
  getVeridaProfileFromWebUser,
} from "@/features/verida-profile/utils"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-profile")

type UseVeridaProfileArgs = {
  did: string | null | undefined
  network?: Network
  contextName?: string
}

export function useVeridaProfile({
  did,
  network = commonConfig.VERIDA_NETWORK,
  contextName = VERIDA_VAULT_CONTEXT_NAME,
}: UseVeridaProfileArgs) {
  const { did: currentUserDid, webUserInstanceRef } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: VeridaProfileQueryKeys.profile(did),
    enabled: !!did,
    queryFn: () => {
      if (!did) {
        // To satisfy the type checker
        // Should not happen as the hook is disabled if !did
        throw new Error("DID is required")
      }

      // TODO: Use getVeridaProfile instead once the backend is stable.
      // Lots of calls returning errors and no profile right now.

      if (currentUserDid === did) {
        return getVeridaProfileFromWebUser({
          webUserInstance: webUserInstanceRef.current,
        })
      }

      return getVeridaProfileFromClient({
        did,
        network,
        contextName,
        options: {
          rpcUrl: commonConfig.VERIDA_RPC_URL,
        },
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
