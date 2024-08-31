"use client"

import { Inbox } from "@/components/icons/inbox"
import { useInbox } from "@/features/inbox/hooks"

export function InboxWithBadge() {
  const { unreadMessageCount } = useInbox()

  // FIXME: Likely to break if unreadMessageCount is greater than 9
  return (
    <div className="relative">
      <Inbox />
      {unreadMessageCount > 0 && (
        <div className="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/4 translate-x-1/2 items-center justify-center rounded-full border border-destructive-foreground bg-destructive text-[0.5rem] font-semibold text-destructive-foreground">
          {unreadMessageCount}
        </div>
      )}
    </div>
  )
}
