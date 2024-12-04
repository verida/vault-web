import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetContent,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export type DataRequestItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  // TODO: Add inbox entry
}

export function DataRequestItemPageContent(
  props: DataRequestItemPageContentProps
) {
  const { open, onOpenChange } = props

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader>
          <ItemSheetTitle description="Data request inbox message">
            Data Request
          </ItemSheetTitle>
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
      </ItemSheetContent>
    </ItemSheet>
  )
}
DataRequestItemPageContent.displayName = "DataRequestItemPageContent"
