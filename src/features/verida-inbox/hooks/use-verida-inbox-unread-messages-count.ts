import { useQuery } from "@tanstack/react-query"

import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { getUnreadMessagesCount } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useVeridaInboxUnreadMessagesCount() {
  const { messagingEngine } = useVeridaInbox()
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngine,
    // TODO: Extract query key in a query keys factory
    queryKey: ["inbox", did, "unreadMessageCount"],
    queryFn: () => {
      if (!messagingEngine) {
        throw new Error("Messaging engine not found")
      }

      return getUnreadMessagesCount(messagingEngine)
    },
  })

  return {
    unreadMessagesCount: data,
    ...query,
  }
}
