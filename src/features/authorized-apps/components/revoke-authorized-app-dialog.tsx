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
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { cn } from "@/styles/utils"
import { wait } from "@/utils/misc"

type RevokeAuthorizedAppDialogProps = {
  authorizedApp: AuthorizedAppRecord
} & Pick<React.ComponentProps<typeof Button>, "className" | "size" | "variant">

export function RevokeAuthorizedAppDialog(
  props: RevokeAuthorizedAppDialogProps
) {
  const {
    authorizedApp,
    variant = "outline-destructive",
    size = "icon",
    className,
  } = props

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
            <Button variant={variant} size={size} className={cn(className)}>
              <DeleteIcon className="size-5 shrink-0" />
              <span className="sr-only">Revoke</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Revoke</TooltipContent>
      </Tooltip>
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
