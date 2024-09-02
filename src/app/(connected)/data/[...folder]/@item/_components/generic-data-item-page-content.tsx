import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"

export type GenericDataItemPageContentProps = {
  open: boolean
  onClose: () => void
  // TODO: Add data item
}

export function GenericDataItemPageContent(
  props: GenericDataItemPageContentProps
) {
  const { open, onClose } = props

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle>TODO: Data item title</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Generi data content</ItemSheetBody>
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
GenericDataItemPageContent.displayName = "GenericDataItemPageContent"
