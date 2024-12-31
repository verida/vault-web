import { useQuery, useQueryClient } from "@tanstack/react-query"

import { AuthorizedAppBaseSchema } from "@/features/authorized-apps/schemas"
import { getAuthorizedApps } from "@/features/authorized-apps/utils"
import { UseVeridaDataRecordsArgs } from "@/features/verida-database/hooks/use-verida-data-records"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UseAuthorizedAppsArgs = Pick<
  UseVeridaDataRecordsArgs<typeof AuthorizedAppBaseSchema>,
  "filter" | "options"
>

export function useAuthorizedApps({
  filter,
  options,
}: UseAuthorizedAppsArgs = {}) {
  const { did, getAccountSessionToken } = useVerida()

  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    enabled: !!did,
    // TODO: Extract query key in a key factory
    queryKey: ["authorized-apps", did, filter, options],
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()

      // TODO: Populate the cache for the authorized app query

      const result = await getAuthorizedApps({ sessionToken, filter, options })

      result.records.forEach((record) => {
        // TODO: Extract query key in a key factory
        queryClient.setQueryData(["authorized-apps", did, record._id], record)
      })

      return result
    },
    meta: {
      logCategory: "authorized-apps",
      errorMessage: "Error fetching authorized apps",
    },
  })

  return {
    authorizedApps: data?.records,
    pagination: data?.pagination,
    ...query,
  }
}
