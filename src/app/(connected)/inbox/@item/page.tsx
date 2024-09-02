"use client"

import { useRouter } from "next/navigation"
import { Suspense, useCallback, useMemo } from "react"

import { DataRequestItemPage } from "@/app/(connected)/inbox/@item/_components/data-request-item-page"
import { IncomingDataItemPage } from "@/app/(connected)/inbox/@item/_components/incoming-data-item-page"
import { MessageItemPage } from "@/app/(connected)/inbox/@item/_components/message-item-page"
import { UnsupportedItemPage } from "@/app/(connected)/inbox/@item/_components/unsupported-item-page"
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

  // TODO: fetch item data
  // TODO: Need to create a hook useInboxEntry to get the item data
  // TODO: Need to rework the useMessages as useInboxEntries and populate the individual useInboxEntry cache with the data

  const itemPage = useMemo(() => {
    if (!itemId) {
      return null
    }

    // TODO: Get the type from the inbox entry
    switch (testType) {
      case InboxType.DATA_REQUEST:
        return <DataRequestItemPage open onClose={handleClose} />
      case InboxType.DATA_SEND:
        return <IncomingDataItemPage open onClose={handleClose} />
      case InboxType.MESSAGE:
        return <MessageItemPage open onClose={handleClose} />
      default:
        return <UnsupportedItemPage open onClose={handleClose} />
    }
  }, [handleClose, itemId])

  if (itemPage) {
    return <Suspense fallback={null}>{itemPage}</Suspense>
  }

  return null
}
InboxItemPage.displayName = "InboxItemPage"
