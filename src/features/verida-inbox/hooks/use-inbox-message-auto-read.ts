import { useEffect } from "react"

import { useInboxMessageMarkAsRead } from "@/features/verida-inbox/hooks/use-inbox-message-mark-as-read"
import type { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

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
  const { markAsReadAsync } = useInboxMessageMarkAsRead()

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
