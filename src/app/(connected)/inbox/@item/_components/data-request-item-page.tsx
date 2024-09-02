import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export type DataRequestItemPageProps = {
  open: boolean
  onClose: () => void
  // TODO: Add inbox entry
}

export function DataRequestItemPage(props: DataRequestItemPageProps) {
  const { open, onClose } = props

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle>Data Request</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Data request content</ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <Alert variant="warning">
          <AlertDescription>
            {`Decline if you don't recognize this request`}
          </AlertDescription>
        </Alert>
        <div className="flex flex-row gap-4">
          <Button variant="outline" className="w-full">
            Decline
          </Button>
          <Button variant="primary" className="w-full">
            Share
          </Button>
        </div>
      </ItemSheetFooter>
    </ItemSheet>
  )
}
DataRequestItemPage.displayName = "DataRequestItemPage"
