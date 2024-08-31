import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="heading-4">Disconnect</Typography>
          </DialogTitle>
        </DialogHeader>

        <Typography variant="base-regular" className="mt-4">
          Are you sure you want to disconnect?
        </Typography>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive">Disconnect</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
