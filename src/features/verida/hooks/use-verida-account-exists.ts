import { useQuery } from "@tanstack/react-query"

import { checkAccountExists } from "@/features/verida/utils"

export function useVeridaAccountExists(did: string | null) {
  const { data, ...query } = useQuery({
    enabled: !!did,
    queryKey: ["verida-account-exists", did],
    queryFn: () => {
      if (!did) {
        // Should not happen
        throw new Error("No DID provided")
      }

      return checkAccountExists(did)
    },
    staleTime: 1000 * 60 * 60 * 24 * 2, // 48 hours
    meta: {
      logCategory: "verida",
      errorMessage: "Failed to check if account exists",
      persist: true,
    },
  })

  return {
    accountExists: data ?? null,
    ...query,
  }
}
