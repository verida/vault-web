import { useQuery } from "@tanstack/react-query"

import { getAuthorizedApp } from "@/features/authorized-apps/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UseAuthorizedAppArgs = {
  authorizedAppRecordId: string
}

export function useAuthorizedApp({
  authorizedAppRecordId,
}: UseAuthorizedAppArgs) {
  const { did, getAccountSessionToken } = useVerida()

  const { data: authorizedApp, ...query } = useQuery({
    enabled: !!did,
    // TODO: Extract query key in a key factory
    queryKey: ["authorized-apps", did, authorizedAppRecordId],
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()
      return getAuthorizedApp({ sessionToken, authorizedAppRecordId })
    },
    meta: {
      logCategory: "authorized-apps",
      errorMessage: "Error fetching authorized app",
    },
  })

  return { authorizedApp, ...query }
}
