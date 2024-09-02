"use client"

import { useRouter } from "next/navigation"
import { Suspense, useCallback, useMemo } from "react"

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

  const handleClose = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete("itemId")
    router.push(url.toString())
  }, [router])

  // TODO: fetch item
  // TODO: Need to create a hook useInboxEntry to get the item data
  // TODO: Need to rework the useMessages as useInboxEntries and populate the individual useInboxEntry cache with the data

  const itemPage = useMemo(() => {
    if (!itemId) {
      return null
    }

    // TODO: Get the type from the inbox entry
    switch (testType) {
      case InboxType.DATA_REQUEST:
        return <DataRequestItemPageContent open onClose={handleClose} />
      case InboxType.DATA_SEND:
        return <IncomingDataItemPageContent open onClose={handleClose} />
      case InboxType.MESSAGE:
        return <MessageItemPageContent open onClose={handleClose} />
      default:
        return <UnsupportedItemPageContent open onClose={handleClose} />
    }
  }, [handleClose, itemId])

  if (itemPage) {
    return <Suspense fallback={null}>{itemPage}</Suspense>
  }

  return null
}
InboxItemPage.displayName = "InboxItemPage"
