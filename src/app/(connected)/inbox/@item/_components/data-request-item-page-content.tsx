import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type DataRequestItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function DataRequestItemPageContent(
  props: DataRequestItemPageContentProps
) {
  const { inboxMessage } = props

  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Data request inbox message">
          Data Request
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
        <InboxMessageHeader inboxMessage={inboxMessage} />
      </ItemSheetBody>
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
    </>
  )
}
DataRequestItemPageContent.displayName = "DataRequestItemPageContent"
