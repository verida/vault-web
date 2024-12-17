"use client"

import { useCallback } from "react"

import { DeleteIcon } from "@/components/icons/delete-icon"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/styles/utils"
import { wait } from "@/utils/misc"

type RevokeAllAuthorizedAppsDialogProps = Pick<
  React.ComponentProps<typeof Button>,
  "className" | "size" | "variant"
>

export function RevokeAllAuthorizedAppsDialog(
  props: RevokeAllAuthorizedAppsDialogProps
) {
  const { variant = "outline-destructive", className } = props

  // TODO: Implement a custom hook for deleting the authorized app

  const handleRevoke = useCallback(async () => {
    // TODO: Use the mutation function from the custom hook instead of this mock
    await wait(2000)
  }, [])

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              variant={variant}
              className={cn(
                "h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2",
                className
              )}
            >
              <DeleteIcon className="size-5 sm:hidden" />
              <span className="sr-only sm:not-sr-only">Revoke All</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Revoke authorization for all apps</TooltipContent>
      </Tooltip>
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
