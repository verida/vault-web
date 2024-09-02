import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export type IncomingDataItemPageContentProps = {
  open: boolean
  onClose: () => void
  // TODO: Add inbox entry
}

export function IncomingDataItemPageContent(
  props: IncomingDataItemPageContentProps
) {
  const { open, onClose } = props

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle description="Incoming data inbox message">
          Incoming Data
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Incoming data content</ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <Alert variant="warning">
          <AlertDescription>
            {`Decline if you don't recognize this message`}
          </AlertDescription>
        </Alert>
        <div className="flex flex-row gap-4">
          <Button variant="outline" className="w-full">
            Decline
          </Button>
          <Button variant="primary" className="w-full">
            Accept
          </Button>
        </div>
      </ItemSheetFooter>
    </ItemSheet>
  )
}
IncomingDataItemPageContent.displayName = "IncomingDataItemPageContent"
