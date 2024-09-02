import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"

export type MessageItemPageProps = {
  open: boolean
  onClose: () => void
  // TODO: Add inbox entry
}

export function MessageItemPage(props: MessageItemPageProps) {
  const { open, onClose } = props

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle>Message</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Message content</ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <div className="flex flex-row gap-4">
          <Button variant="primary" className="w-full">
            Mark as read
          </Button>
        </div>
      </ItemSheetFooter>
    </ItemSheet>
  )
}
MessageItemPage.displayName = "MessageItemPage"
