import { useQuery, useQueryClient } from "@tanstack/react-query"

import {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
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

  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    queryKey: VeridaInboxQueryKeys.inboxMessages({ did, filter, options }),
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

      for (const message of result.records) {
        queryClient.setQueryData(
          VeridaInboxQueryKeys.inboxMessage({
            did,
            messageRecordId: message._id,
          }),
          message
        )
      }

      return result
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 30, // 30 minutes
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
