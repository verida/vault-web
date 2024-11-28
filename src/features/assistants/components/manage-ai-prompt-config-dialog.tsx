"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type ManageAiPromptConfigDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageAiPromptConfigDialog(
  props: ManageAiPromptConfigDialogProps
) {
  const { open, onOpenChange } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configuration</DialogTitle>
          <DialogDescription>
            Fine-tune the configuration of your prompt
          </DialogDescription>
        </DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter>
          <Button variant="primary">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
ManageAiPromptConfigDialog.displayName = "ManageAiPromptConfigDialog"
