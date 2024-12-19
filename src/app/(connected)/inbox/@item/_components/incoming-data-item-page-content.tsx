import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type IncomingDataItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function IncomingDataItemPageContent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: IncomingDataItemPageContentProps
) {
  return (
    <>
      <ItemSheetHeader>
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
    </>
  )
}
IncomingDataItemPageContent.displayName = "IncomingDataItemPageContent"
