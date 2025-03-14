"use client"

import { useCallback, useMemo } from "react"

import { DataItemPageContent } from "@/app/(connected)/data/[databaseId]/@item/_components/data-item-page-content"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { useItemIdState } from "@/features/data/hooks/use-itemd-id-state"

export interface DataItemPageProps {
  params: {
    databaseId: string
  }
}

export default function DataItemPage(props: DataItemPageProps) {
  const { params } = props

  const { databaseId: encodedDatabaseId } = params
  const databaseId = decodeURIComponent(encodedDatabaseId)

  const databaseDefinition = useMemo(
    () =>
      USER_DATABASE_DEFS.find((databaseDef) => databaseDef.id === databaseId),
    [databaseId]
  )

  const { itemId, setItemId } = useItemIdState()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setItemId(null, { history: "push" })
      }
    },
    [setItemId]
  )

  if (!itemId || !databaseDefinition) {
    return null
  }

  return (
    <DataItemPageContent
      open
      onOpenChange={handleOpenChange}
      databaseDefinition={databaseDefinition}
      itemId={itemId}
    />
  )
}
DataItemPage.displayName = "DataItemPage"
