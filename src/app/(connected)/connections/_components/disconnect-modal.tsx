import { Typography } from "@/components/typography"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContainer,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export type DisconnectModalProps = {
  isOpen: boolean
  onClose: () => void
  connectionId: string
}

export function DisconnectModal(props: DisconnectModalProps) {
  const { isOpen, onClose } = props

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContainer>
        <AlertDialogHeader>
          <AlertDialogTitle>Disconnect</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogContent>
          <Typography variant="base-regular">
            Are you sure you want to disconnect?
          </Typography>
        </AlertDialogContent>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive">Disconnect</Button>
        </AlertDialogFooter>
      </AlertDialogContainer>
    </AlertDialog>
  )
}
