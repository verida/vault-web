import { useQuery } from "@tanstack/react-query"

import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { getUnreadMessagesCount } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useVeridaInboxUnreadMessagesCount() {
  const { messagingEngine } = useVeridaInbox()
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    queryKey: VeridaInboxQueryKeys.unreadMessagesCount({ did }),
    queryFn: () => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not found")
      }

      return getUnreadMessagesCount(messagingEngine)
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      logCategory: "verida-inbox",
      errorMessage: "Error fetching Verida inbox unread messages count",
    },
  })

  return {
    unreadMessagesCount: data,
    ...query,
  }
}
