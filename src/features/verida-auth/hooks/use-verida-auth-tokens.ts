import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"

import { UseQueryOptions } from "@/features/queries/types"
import { Logger } from "@/features/telemetry/logger"
import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import { getVeridaAuthTokens } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-auth")

/**
 * Custom hook to fetch Verida Auth tokens for the authenticated user.
 *
 * This hook uses React Query to fetch and cache the auth tokens.
 * It automatically retrieves the session token from the Verida context.
 *
 * @param queryOptions - Optional React Query configuration options
 */
export function useVeridaAuthTokens(queryOptions?: UseQueryOptions) {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    enabled: !!did && queryOptions?.enabled !== false,
    queryKey: VeridaAuthQueryKeys.authTokens(did),
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()
      const tokens = await getVeridaAuthTokens({ sessionToken })

      // Set individual token query data for each token
      tokens.forEach((token) => {
        if (token._id) {
          queryClient.setQueryData(
            VeridaAuthQueryKeys.authToken({ did, tokenId: token._id }),
            token
          )
        }
      })

      return tokens
    },
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    gcTime: queryOptions?.gcTime,
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Failed to fetch Verida Auth tokens",
    },
  })

  return {
    authTokens: data,
    ...query,
  }
}

/**
 * Invalidates the Verida Auth tokens query for a specific user.
 *
 * This function can be used to force a refetch of the auth tokens
 * when they might have changed (e.g., after granting or revoking access).
 *
 * @param queryClient - The React Query client instance
 * @param did - The DID of the user whose tokens should be invalidated
 */
export async function invalidateVeridaAuthTokens(
  queryClient: QueryClient,
  did: string
) {
  await queryClient.invalidateQueries({
    queryKey: VeridaAuthQueryKeys.authTokens(did),
  })
  logger.info("Successfully invalidated Verida Auth tokens queries")
}
