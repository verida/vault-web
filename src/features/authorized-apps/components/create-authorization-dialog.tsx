"use client"

import { PlusIcon } from "@/components/icons/plus-icon"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/styles/utils"

type CreateAuthorizationDialogProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
>

export function CreateAuthorizationDialog(
  props: CreateAuthorizationDialogProps
) {
  const { className, variant = "primary", ...buttonProps } = props

  // TODO: Implement the dialog

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant={variant}
              {...buttonProps}
              className={cn(
                "h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2",
                className
              )}
            >
              <PlusIcon className="size-5 sm:hidden" />
              <span className="sr-only sm:not-sr-only">Create</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Create a new authorization</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Authorization</DialogTitle>
          <DialogDescription>
            Create a new authorization for an app
          </DialogDescription>
        </DialogHeader>
        <DialogBody></DialogBody>
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
