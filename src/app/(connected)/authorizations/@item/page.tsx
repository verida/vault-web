"use client"

import { useCallback, useMemo } from "react"

import { AuthorizedAppItemPageContent } from "@/app/(connected)/authorizations/@item/_components/authorized-app-item-page"
import { useAuthorizedAppItemIdState } from "@/features/authorized-apps/hooks/use-authorized-app-item-id-state"

export default function AuthorizationsItemPage() {
  const { itemId, setItemId } = useAuthorizedAppItemIdState()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setItemId(null, { history: "push" })
      }
    },
    [setItemId]
  )

  const itemPage = useMemo(() => {
    if (!itemId) {
      return null
    }

    return (
      <AuthorizedAppItemPageContent
        open
        onOpenChange={handleOpenChange}
        itemId={itemId}
      />
    )
  }, [itemId, handleOpenChange])

  if (itemPage) {
    return itemPage
  }

  return null
}
AuthorizationsItemPage.displayName = "AuthorizationsItemPage"
