"use client"

import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

import { DataItemPageContent } from "@/app/(connected)/data/[databaseId]/@item/_components/data-item-page-content"
import { DATABASE_DEFS } from "@/features/data/constants"

type DataItemPageProps = {
  params: { databaseId: string }
  searchParams: { itemId: string }
}

export default function DataItemPage(props: DataItemPageProps) {
  const { params, searchParams } = props

  const { databaseId: encodedDatabaseId } = params
  const databaseId = decodeURIComponent(encodedDatabaseId)

  const databaseDefinition = useMemo(
    () => DATABASE_DEFS.find((databaseDef) => databaseDef.id === databaseId),
    [databaseId]
  )

  const { itemId: encodedItemId } = searchParams
  const itemId = encodedItemId ? decodeURIComponent(encodedItemId) : undefined

  const router = useRouter()

  const handleClose = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete("itemId")
    router.push(url.toString())
  }, [router])

  const itemPage = useMemo(() => {
    if (!itemId || !databaseDefinition) {
      return null
    }

    return (
      <DataItemPageContent
        open
        onClose={handleClose}
        databaseDefinition={databaseDefinition}
        itemId={itemId}
      />
    )
  }, [itemId, handleClose, databaseDefinition])

  if (itemPage) {
    return <>{itemPage}</>
  }

  return null
}
DataItemPage.displayName = "DataItemPage"
