import Image from "next/image"

import NoInboxImage from "@/assets/no-inbox.svg"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/components/ui/empty-state"

export function NoInbox() {
  return (
    <EmptyState>
      <Image
        src={NoInboxImage}
        width={100}
        height={140}
        alt="no-inbox"
        className="h-[105px] md:h-[140px]"
      />
      <EmptyStateTitle>No messages yet</EmptyStateTitle>
      <EmptyStateDescription>
        You have no messages in your inbox. They will appear here once you
        receive them.
      </EmptyStateDescription>
    </EmptyState>
  )
}
