import { useEffect } from "react"

import { useInboxMessageReadHandler } from "@/features/verida-inbox/hooks/use-inbox-message-read-handler"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

type UseInboxMessageAutoReadOptions = {
  messageRecord?: VeridaInboxMessageRecord | null
  delay?: number // Delay in milliseconds before marking as read
  disabled?: boolean // Whether auto-read is disabled
}

export function useInboxMessageAutoRead({
  messageRecord,
  delay = 3000, // 3 seconds
  disabled = false,
}: UseInboxMessageAutoReadOptions) {
  const { markAsReadAsync } = useInboxMessageReadHandler()

  useEffect(() => {
    if (disabled || !messageRecord || messageRecord.read) {
      return
    }

    const timeoutId = setTimeout(() => {
      markAsReadAsync({ messageRecord }).catch(() => {
        // Error is already logged by the mutation
      })
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [messageRecord, delay, disabled, markAsReadAsync])
}
