import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type DisconnectModalProps = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
}

export function DisconnectModal(props: DisconnectModalProps) {
  const { isOpen, onClose } = props

  return (
    <Dialog
      // TODO: Use an AlertDialog instead?
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Disconnect</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive">Disconnect</Button>
        </DialogFooter>
      </DialogContainer>
    </Dialog>
  )
}
