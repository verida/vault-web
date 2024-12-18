import { useQuery } from "@tanstack/react-query"

import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { getVeridaInboxMessages } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export type UseGetVeridaInboxMessagesArgs = {
  filter?: VeridaDatabaseQueryFilter<VeridaInboxMessageRecord>
  options?: VeridaDatabaseQueryOptions<VeridaInboxMessageRecord>
}

export function useGetVeridaInboxMessages({
  filter,
  options,
}: UseGetVeridaInboxMessagesArgs = {}) {
  const { did, getAccountSessionToken } = useVerida()
  const { messagingEngine } = useVeridaInbox()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    queryKey: ["inbox", did, "messages", filter, options],
    queryFn: async () => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not found")
      }

      const sessionToken = await getAccountSessionToken()

      const result = await getVeridaInboxMessages({
        sessionToken,
        messagingEngine,
        filter,
        options,
      })

      // TODO: Populate the cache for the individual messages

      return result
    },
    meta: {
      logCategory: "verida-inbox",
      errorMessage: "Error fetching Verida inbox messages",
    },
  })

  return {
    inboxMessages: data?.records,
    pagination: data?.pagination,
    ...query,
  }
}
