import { useQuery } from "@tanstack/react-query"

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

  const { data, ...query } = useQuery({
    enabled: !!did,
    queryKey: ["authorized-apps", did, filter, options],
    queryFn: async () => {
      const sessionToken = await getAccountSessionToken()
      return getAuthorizedApps({ sessionToken, filter, options })
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
