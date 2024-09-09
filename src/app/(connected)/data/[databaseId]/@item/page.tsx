"use client"

import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

import { GenericDataItemPageContent } from "@/app/(connected)/data/[databaseId]/@item/_components/generic-data-item-page-content"

type DataItemPageProps = {
  searchParams: { itemId: string }
}

export default function DataItemPage(props: DataItemPageProps) {
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

  // TODO: Handle loading and error states

  const itemPage = useMemo(() => {
    if (!itemId) {
      return null
    }

    // TODO: Implement switch over data types with specific item pages
    return <GenericDataItemPageContent open onClose={handleClose} />
  }, [itemId, handleClose])

  if (itemPage) {
    return <>{itemPage}</>
  }

  return null
}
DataItemPage.displayName = "DataItemPage"
