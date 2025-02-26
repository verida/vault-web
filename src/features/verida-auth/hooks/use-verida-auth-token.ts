import { QueryClient, useQuery } from "@tanstack/react-query"

import { UseQueryOptions } from "@/features/queries/types"
import { Logger } from "@/features/telemetry/logger"
import { getVeridaAuthToken } from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-auth")

type UseVeridaAuthTokenArgs = {
  tokenId: string
}

/**
 * Custom hook to fetch a single Verida Auth token by ID.
 *
 * This hook uses React Query to fetch and cache the auth token.
 * It automatically retrieves the session token from the Verida context.
 *
 * @param args - Arguments for the hook
 * @param args.tokenId - The ID of the token to fetch
 * @param queryOptions - Optional React Query configuration options
 * @returns Object containing:
 *   - token: The Verida Auth token if found, null if not found
 *   - isLoading: Boolean indicating if the query is in progress
 *   - isError: Boolean indicating if the query resulted in an error
 *   - error: Any error that occurred during the query
 *   - refetch: Function to manually refetch the data
 */
export function useVeridaAuthToken(
  { tokenId }: UseVeridaAuthTokenArgs,
  queryOptions?: UseQueryOptions
) {
  const { did, getAccountSessionToken } = useVerida()

  const { data, ...query } = useQuery({
    queryKey: ["verida-auth", "token", did, tokenId],
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()
      return getVeridaAuthToken({ tokenId, sessionToken })
    },
    enabled: !!did && !!tokenId && queryOptions?.enabled !== false,
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    gcTime: queryOptions?.gcTime,
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Failed to fetch Verida Auth token",
    },
  })

  return {
    authToken: data,
    ...query,
  }
}

/**
 * Invalidates the Verida Auth token query for a specific token.
 *
 * This function can be used to force a refetch of a specific auth token
 * when it might have changed (e.g., after modifying its permissions).
 *
 * @param queryClient - The React Query client instance
 * @param did - The DID of the user
 * @param tokenId - The ID of the token to invalidate
 */
export async function invalidateVeridaAuthToken(
  queryClient: QueryClient,
  did: string,
  tokenId: string
) {
  await queryClient.invalidateQueries({
    queryKey: ["verida-auth", "token", did, tokenId],
  })
  logger.info("Successfully invalidated Verida Auth token query", { tokenId })
}
