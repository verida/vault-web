import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import { VeridaInboxQueryKeys } from "@/features/verida-inbox/queries"
import { useVerida } from "@/features/verida/hooks/use-verida"

export function useUpdateInboxQueryCache() {
  const { did } = useVerida()
  const queryClient = useQueryClient()

  const cancelInboxQueries = useCallback(async () => {
    await queryClient.cancelQueries({
      queryKey: VeridaInboxQueryKeys.invalidateInbox(),
    })
  }, [queryClient])

  const invalidateInboxMessages = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: VeridaInboxQueryKeys.invalidateInboxMessages(),
    })
  }, [queryClient])

  const invalidateInboxMessage = useCallback(
    (messageRecordId: string) => {
      queryClient.invalidateQueries({
        queryKey: VeridaInboxQueryKeys.invalidateInboxMessage({
          did,
          messageRecordId,
        }),
      })
    },
    [queryClient, did]
  )

  const invalidateUnreadMessagesCount = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: VeridaInboxQueryKeys.invalidateUnreadMessagesCount(),
    })
  }, [queryClient])

  return {
    cancelInboxQueries,
    invalidateInboxMessages,
    invalidateInboxMessage,
    invalidateUnreadMessagesCount,
  }
}
