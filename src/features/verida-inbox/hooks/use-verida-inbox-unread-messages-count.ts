import { useQuery } from "@tanstack/react-query"

import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { getUnreadMessagesCount } from "@/features/verida-inbox/utils"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useVeridaInboxUnreadMessagesCount() {
  const { messagingEngineRef } = useVeridaInbox()
  const { did } = useVerida()

  const { data, ...query } = useQuery({
    enabled: !!did && !!messagingEngineRef.current,
    // TODO: Extract query key in a query keys factory
    queryKey: ["inbox", did, "unreadMessageCount"],
    queryFn: () => {
      if (!messagingEngineRef.current) {
        throw new Error("Messaging engine not found")
      }

      return getUnreadMessagesCount(messagingEngineRef.current)
    },
  })

  return {
    unreadMessagesCount: data,
    ...query,
  }
}
