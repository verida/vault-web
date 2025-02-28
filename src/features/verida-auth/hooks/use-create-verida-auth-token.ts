import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Logger } from "@/features/telemetry/logger"
import { VeridaAuthQueryKeys } from "@/features/verida-auth/queries"
import {
  CreateVeridaAuthTokenResult,
  createVeridaAuthToken,
} from "@/features/verida-auth/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

const logger = Logger.create("verida-auth")

export type CreateVeridaAuthTokenArgs = {
  scopes: string[]
}

/**
 * Custom hook to create a new Verida Auth token.
 *
 * This hook uses React Query mutation to handle the token creation process.
 * It automatically retrieves the session token from the Verida context.
 *
 * @returns Object containing:
 *   - createAuthToken: Function to trigger the token creation
 *   - createAuthTokenAsync: Async version of the creation function
 *   - isLoading: Boolean indicating if the mutation is in progress
 *   - isError: Boolean indicating if the mutation resulted in an error
 *   - error: Any error that occurred during the mutation
 *   - isSuccess: Boolean indicating if the mutation was successful
 */
export function useCreateVeridaAuthToken() {
  const { did, getAccountSessionToken } = useVerida()
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, ...mutation } = useMutation<
    CreateVeridaAuthTokenResult,
    Error,
    CreateVeridaAuthTokenArgs
  >({
    mutationFn: async ({ scopes }: CreateVeridaAuthTokenArgs) => {
      const sessionToken = await getAccountSessionToken()
      return createVeridaAuthToken({
        scopes,
        sessionToken,
        fetchTokenDetails: true,
      })
    },
    onSuccess: (result) => {
      // If we have token details, update the cache
      if (result.tokenDetails && result.tokenDetails._id) {
        // Add the new token to the individual token cache
        queryClient.setQueryData(
          VeridaAuthQueryKeys.authToken({
            did,
            tokenId: result.tokenDetails._id,
          }),
          result.tokenDetails
        )
      }

      queryClient.invalidateQueries({
        queryKey: VeridaAuthQueryKeys.authTokens(did),
      })

      logger.info("Successfully created auth token", { result })
    },
    meta: {
      logCategory: "verida-auth",
      errorMessage: "Error creating Verida Auth token",
    },
  })

  return {
    createAuthToken: mutate,
    createAuthTokenAsync: mutateAsync,
    ...mutation,
  }
}
