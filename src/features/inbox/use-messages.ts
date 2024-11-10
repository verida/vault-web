import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

import { useVerida } from "@/features/verida/hooks/use-verida"

export const useMessages = (
  messagingEngine: any,
  filters: Record<string, any> = {},
  offset: number,
  limit: number = 10
) => {
  const { did } = useVerida()

  const fetchMessages = useCallback(
    async (filters: Record<string, any>, offset: number, limit: number) => {
      try {
        const messages = await messagingEngine?.getMessages(filters, {
          skip: offset,
          limit,
          sort: [{ sentAt: "desc" }],
        })

        return messages
      } catch (err) {
        return []
      }
    },
    [messagingEngine]
  )

  const {
    data: messages,
    isPending: isMessagesPending,
    isError: isMessagesError,
  } = useQuery({
    queryKey: [did, "inbox", "messages", offset, limit],
    queryFn: () => fetchMessages(filters, offset, limit),
    enabled: !!messagingEngine,
  })

  return { messages, isMessagesPending, isMessagesError }
}
