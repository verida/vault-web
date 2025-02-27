import { useMutation, useQueryClient } from "@tanstack/react-query"

import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import { revokeVeridaAuthToken } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type RevokeVeridaAuthTokenArgs = {
  tokenId: string
}

/**
 * Custom hook to revoke a Verida Auth token.
 *
 * This hook uses React Query mutation to handle the revocation process.
 * It automatically retrieves the session token from the Verida context.
 */
export function useRevokeVeridaAuthToken() {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation({
    mutationFn: async ({ tokenId }: RevokeVeridaAuthTokenArgs) => {
      const sessionToken = await getAccountSessionToken()
      await revokeVeridaAuthToken({ tokenId, sessionToken })
    },
    onSuccess: (_data, variables) => {
      // Invalidate the tokens list query
      queryClient.invalidateQueries({
        queryKey: VeridaAuthQueryKeys.authTokens(did),
      })

      // Remove the specific token query
      queryClient.removeQueries({
        queryKey: VeridaAuthQueryKeys.authToken({
          did,
          tokenId: variables.tokenId,
        }),
      })
    },
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Error revoking Verida Auth token",
    },
  })

  return {
    revokeAuthToken: mutate,
    revokeAuthTokenAsync: mutateAsync,
    ...mutation,
  }
}
