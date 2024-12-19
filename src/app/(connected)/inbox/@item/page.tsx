"use client"

import { useCallback } from "react"

import { InboxItemPageContent } from "@/app/(connected)/inbox/@item/_components/inbox-item-page-content"
import { useInboxMessageItemIdState } from "@/features/verida-inbox/hooks/use-inbox-message-item-id-state"

export default function InboxItemPage() {
  const { itemId, setItemId } = useInboxMessageItemIdState()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setItemId(null, { history: "push" })
      }
    },
    [setItemId]
  )

  if (!itemId) {
    return null
  }

  return (
    <InboxItemPageContent
      open
      onOpenChange={handleOpenChange}
      itemId={itemId}
    />
  )
}
InboxItemPage.displayName = "InboxItemPage"
