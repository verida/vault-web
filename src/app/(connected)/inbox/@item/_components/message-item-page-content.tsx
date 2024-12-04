import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetContent,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"

export type MessageItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  // TODO: Add inbox entry
}

export function MessageItemPageContent(props: MessageItemPageContentProps) {
  const { open, onOpenChange } = props

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader>
          <ItemSheetTitle description="Inbox message">Message</ItemSheetTitle>
        </ItemSheetHeader>
        <ItemSheetBody>TODO: Message content</ItemSheetBody>
        <ItemSheetFooter className="flex flex-col gap-3">
          <div className="flex flex-row gap-4">
            <Button variant="primary" className="w-full">
              Mark as read
            </Button>
          </div>
        </ItemSheetFooter>
      </ItemSheetContent>
    </ItemSheet>
  )
}
MessageItemPageContent.displayName = "MessageItemPageContent"
