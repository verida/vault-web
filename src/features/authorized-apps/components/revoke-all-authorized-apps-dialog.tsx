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
import { wait } from "@/utils/misc"

type RevokeAllAuthorizedAppsDialogProps = {
  children?: React.ReactNode
}

export function RevokeAllAuthorizedAppsDialog(
  props: RevokeAllAuthorizedAppsDialogProps
) {
  const { children } = props

  // TODO: Implement a custom hook for deleting the authorized app

  const handleRevoke = useCallback(async () => {
    // TODO: Use the mutation function from the custom hook instead of this mock
    await wait(2000)
  }, [])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke All Access</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to revoke access for all authorized apps?
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
RevokeAllAuthorizedAppsDialog.displayName = "RevokeAllAuthorizedAppsDialog"
