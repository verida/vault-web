import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type QueryKey } from "@tanstack/react-query"

import { Logger } from "@/features/telemetry/logger"
import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import type { VeridaAuthToken } from "@/features/verida-auth/types"
import { revokeVeridaAuthToken } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-auth")

type RevokeVeridaAuthTokenArgs = {
  tokenId: string
}

type MutationContext = {
  previousTokensData: Array<[QueryKey, VeridaAuthToken[] | undefined]>
  previousTokenData: VeridaAuthToken | undefined
}

export type UseRevokeVeridaAuthTokenOptions = {
  disableOptimisticUpdate?: boolean
}

/**
 * Custom hook to revoke a Verida Auth token.
 *
 * This hook uses React Query mutation to handle the revocation process.
 * It automatically retrieves the session token from the Verida context.
 *
 * @param options - Options for the hook
 * @param options.disableOptimisticUpdate - Whether to disable optimistic updates
 * @returns Object containing:
 *   - revokeAuthToken: Function to trigger the token revocation
 *   - revokeAuthTokenAsync: Async version of the revocation function
 *   - isLoading: Boolean indicating if the mutation is in progress
 *   - isError: Boolean indicating if the mutation resulted in an error
 *   - error: Any error that occurred during the mutation
 *   - isSuccess: Boolean indicating if the mutation was successful
 */
export function useRevokeVeridaAuthToken(
  options: UseRevokeVeridaAuthTokenOptions = {}
) {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    void,
    Error,
    RevokeVeridaAuthTokenArgs,
    MutationContext
  >({
    mutationFn: async ({ tokenId }: RevokeVeridaAuthTokenArgs) => {
      const sessionToken = await getAccountSessionToken()
      await revokeVeridaAuthToken({ tokenId, sessionToken })
    },
    onMutate: async ({ tokenId }) => {
      if (options.disableOptimisticUpdate) {
        return {
          previousTokensData: [],
          previousTokenData: undefined,
        }
      }

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: VeridaAuthQueryKeys.authTokens(did),
      })

      // Snapshot the previous values for all tokens
      const previousTokensData = queryClient.getQueriesData<VeridaAuthToken[]>({
        queryKey: VeridaAuthQueryKeys.authTokens(did),
      })

      // Optimistically update all tokens lists by removing the token
      previousTokensData.forEach(([queryKey, queryData]) => {
        if (queryData) {
          queryClient.setQueryData(
            queryKey,
            queryData.filter((token) => token._id !== tokenId)
          )
        }
      })

      // Snapshot the previous value for the individual token
      const previousTokenData = queryClient.getQueryData<VeridaAuthToken>(
        VeridaAuthQueryKeys.authToken({ did, tokenId })
      )

      // Remove the token from the cache
      queryClient.removeQueries({
        queryKey: VeridaAuthQueryKeys.authToken({ did, tokenId }),
      })

      // Return a context object with the snapshotted values
      return { previousTokensData, previousTokenData }
    },
    onError: (_error, { tokenId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back

      if (context?.previousTokensData) {
        context.previousTokensData.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData)
        })
      }

      if (context?.previousTokenData) {
        queryClient.setQueryData(
          VeridaAuthQueryKeys.authToken({ did, tokenId }),
          context.previousTokenData
        )
      }
    },
    onSuccess: (_data, { tokenId }) => {
      // Invalidate the tokens list query to ensure it's up to date
      queryClient.invalidateQueries({
        queryKey: VeridaAuthQueryKeys.authTokens(did),
      })

      // Remove the specific token query
      queryClient.removeQueries({
        queryKey: VeridaAuthQueryKeys.authToken({ did, tokenId }),
      })

      logger.info("Successfully revoked auth token", { tokenId })
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
