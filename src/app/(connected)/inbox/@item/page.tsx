"use client"

import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

import { DataRequestItemPageContent } from "@/app/(connected)/inbox/@item/_components/data-request-item-page-content"
import { IncomingDataItemPageContent } from "@/app/(connected)/inbox/@item/_components/incoming-data-item-page-content"
import { MessageItemPageContent } from "@/app/(connected)/inbox/@item/_components/message-item-page-content"
import { UnsupportedItemPageContent } from "@/app/(connected)/inbox/@item/_components/unsupported-item-page-content"
import { InboxType } from "@/features/inbox/types"

type InboxItemPageProps = {
  searchParams: { itemId: string }
}

/**
 * TODO: Remove this once implementation is complete
 */
const testType: InboxType = InboxType.MESSAGE

export default function InboxItemPage(props: InboxItemPageProps) {
  const { searchParams } = props
  const { itemId: encodedItemId } = searchParams
  const itemId = encodedItemId ? decodeURIComponent(encodedItemId) : undefined

  const router = useRouter()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        const url = new URL(window.location.href)
        url.searchParams.delete("itemId")
        router.push(url.toString())
      }
    },
    [router]
  )

  // TODO: fetch item
  // TODO: Need to create a hook useInboxEntry to get the item data
  // TODO: Need to rework the useMessages as useInboxEntries and populate the individual useInboxEntry cache with the data

  // TODO: Handle loading and error states

  const itemPage = useMemo(() => {
    if (!itemId) {
      // TODO: Display a not found message in the modal
      return null
    }

    // TODO: Get the type from the inbox entry
    switch (testType) {
      case InboxType.DATA_REQUEST:
        return (
          <DataRequestItemPageContent open onOpenChange={handleOpenChange} />
        )
      case InboxType.DATA_SEND:
        return (
          <IncomingDataItemPageContent open onOpenChange={handleOpenChange} />
        )
      case InboxType.MESSAGE:
        return <MessageItemPageContent open onOpenChange={handleOpenChange} />
      default:
        return (
          <UnsupportedItemPageContent open onOpenChange={handleOpenChange} />
        )
    }
  }, [handleOpenChange, itemId])

  if (itemPage) {
    return <>{itemPage}</>
  }

  return null
}
InboxItemPage.displayName = "InboxItemPage"
