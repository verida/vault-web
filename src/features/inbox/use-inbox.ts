import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

import { useInboxContext } from "@/features/inbox/use-inbox-context"
import { useVerida } from "@/features/verida/use-verida"

export const useInbox = () => {
  const { messagingEngine } = useInboxContext()
  const { did } = useVerida()

  const fetchUnreadMessageCount = useCallback(async () => {
    try {
      const unreadMessages = await messagingEngine?.getMessages({
        read: false,
      })
      return unreadMessages.length ?? 0
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }, [messagingEngine])

  const fetchTotalMessageCount = useCallback(async () => {
    try {
      const messages = await messagingEngine?.getMessages(
        {},
        { limit: 100000000 }
      )

      // 1 record in the db is for permit
      return messages.length ?? 0
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }, [messagingEngine])

  const {
    data: unreadMessageCount,
    isPending: isUnreadMessageCountPending,
    isError: isUnreadMessageCountError,
  } = useQuery({
    queryKey: [did, "inbox", "unreadMessageCount"],
    queryFn: fetchUnreadMessageCount,
    enabled: !!messagingEngine,
  })

  const {
    data: totalMessageCount,
    isPending: isTotalMessageCountPending,
    isError: isTotalMessageCountError,
  } = useQuery({
    queryKey: [did, "inbox", "totalMessageCount"],
    queryFn: fetchTotalMessageCount,
    enabled: !!messagingEngine,
  })

  return {
    unreadMessageCount,
    isUnreadMessageCountPending,
    isUnreadMessageCountError,
    totalMessageCount,
    isTotalMessageCountPending,
    isTotalMessageCountError,
  }
}
