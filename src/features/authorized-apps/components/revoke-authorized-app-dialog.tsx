"use client"

import { useCallback } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { wait } from "@/utils/misc"

export type RevokeAuthorizedAppDialogProps = {
  authorizedApp: AuthorizedAppRecord
  onRevoke?: () => void
  children?: React.ReactNode
}

export function RevokeAuthorizedAppDialog(
  props: RevokeAuthorizedAppDialogProps
) {
  const { authorizedApp, onRevoke, children } = props

  // TODO: Implement a custom hook for deleting the authorized app

  const handleRevoke = useCallback(async () => {
    // TODO: Use the mutation function from the custom hook instead of this mock
    await wait(2000)
    onRevoke?.()
  }, [onRevoke])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke Access</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to revoke access for {authorizedApp.name}?
          </AlertDialogDescription>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleRevoke}>
            Revoke
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
RevokeAuthorizedAppDialog.displayName = "RevokeAuthorizedAppDialog"
