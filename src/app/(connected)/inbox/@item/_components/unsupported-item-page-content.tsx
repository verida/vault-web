import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"

export type UnsupportedItemPageContentProps = {
  open: boolean
  onClose: () => void
  // TODO: Add inbox entry
}

export function UnsupportedItemPageContent(
  props: UnsupportedItemPageContentProps
) {
  const { open, onClose } = props

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle>Inbox entry</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Unsupported inbox entry content</ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <div className="flex flex-row gap-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </ItemSheetFooter>
    </ItemSheet>
  )
}
UnsupportedItemPageContent.displayName = "UnsupportedItemPageContent"
