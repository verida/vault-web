"use client"

import { InboxIcon } from "@/components/icons/inbox-icon"
import { useVeridaInboxUnreadMessagesCount } from "@/features/verida-inbox/hooks/use-verida-inbox-unread-messages-count"

export function InboxWithBadge() {
  const { unreadMessagesCount } = useVeridaInboxUnreadMessagesCount()

  // FIXME: Likely to break if unreadMessageCount is greater than 9
  return (
    <div className="relative">
      <InboxIcon />
      {unreadMessagesCount && unreadMessagesCount > 0 ? (
        <div className="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/4 translate-x-1/2 items-center justify-center rounded-full border border-destructive-foreground bg-destructive text-[0.5rem] font-semibold text-destructive-foreground">
          {unreadMessagesCount}
        </div>
      ) : null}
    </div>
  )
}
InboxWithBadge.displayName = "InboxWithBadge"
