import { useQuery } from "@tanstack/react-query"

import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { getVeridaInboxMessage } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

type UseGetVeridaInboxMessageArgs = {
  messageRecordId: string
}

export function useGetVeridaInboxMessage({
  messageRecordId,
}: UseGetVeridaInboxMessageArgs) {
  const { did } = useVerida()
  const { messagingEngine } = useVeridaInbox()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    queryKey: VeridaInboxQueryKeys.inboxMessage({ did, messageRecordId }),
    queryFn: async () => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not found")
      }

      return getVeridaInboxMessage({ messagingEngine, messageRecordId })
    },
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "verida-inbox",
      errorMessage: "Error fetching Verida inbox message",
    },
  })

  return { inboxMessageRecord: data, ...query }
}
