"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type CreateAuthorizationDialogProps = {
  children?: React.ReactNode
}

export function CreateAuthorizationDialog(
  props: CreateAuthorizationDialogProps
) {
  const { children } = props

  // TODO: Implement the dialog

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Authorization</DialogTitle>
          <DialogDescription>
            Create a new authorization for an app
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Alert variant="warning">
            <AlertTitle>Non-functional</AlertTitle>
            <AlertDescription>
              This Authorized Apps feature is not functional yet. Only the UI
              has been (partially) implemented for the moment.
            </AlertDescription>
          </Alert>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
CreateAuthorizationDialog.displayName = "CreateAuthorizationDialog"
