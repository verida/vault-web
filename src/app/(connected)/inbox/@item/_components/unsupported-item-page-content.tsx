import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetContent,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"

export type UnsupportedItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  // TODO: Add inbox entry
}

export function UnsupportedItemPageContent(
  props: UnsupportedItemPageContentProps
) {
  const { open, onOpenChange } = props

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader>
          <ItemSheetTitle description="Unsupported inbox entry">
            Inbox entry
          </ItemSheetTitle>
        </ItemSheetHeader>
        <ItemSheetBody>TODO: Unsupported inbox entry content</ItemSheetBody>
        <ItemSheetFooter className="flex flex-col gap-3">
          <div className="flex flex-row gap-4">
            <Button variant="outline" className="w-full" asChild>
              <ItemSheetClose>Close</ItemSheetClose>
            </Button>
          </div>
        </ItemSheetFooter>
      </ItemSheetContent>
    </ItemSheet>
  )
}
UnsupportedItemPageContent.displayName = "UnsupportedItemPageContent"
