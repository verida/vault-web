import { Typography } from "../typography"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

type Props = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
} & React.PropsWithChildren

function DisconnectModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant={"heading-4"}>Disconnect</Typography>
          </DialogTitle>
        </DialogHeader>

        <Typography variant={"base-regular"} className="mt-4">
          Are you sure you want to disconnect?
        </Typography>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"}>Disconnect</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { DisconnectModal }
