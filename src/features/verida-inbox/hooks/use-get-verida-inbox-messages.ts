import { useQuery, useQueryClient } from "@tanstack/react-query"

import type {
  VeridaDatabaseQueryFilter,
  VeridaDatabaseQueryOptions,
} from "@/features/verida-database/types"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import type { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
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
  const { did } = useVerida()
  const { messagingEngine } = useVeridaInbox()

  const queryClient = useQueryClient()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    queryKey: VeridaInboxQueryKeys.inboxMessages({ did, filter, options }),
    queryFn: async () => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not found")
      }

      const result = await getVeridaInboxMessages({
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
    inboxMessageRecords: data?.records,
    pagination: data?.pagination,
    ...query,
  }
}
