import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import {
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type UnsupportedItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function UnsupportedItemPageContent(
  props: UnsupportedItemPageContentProps
) {
  const { inboxMessage } = props
  const { message } = inboxMessage

  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Unsupported inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <div className="rounded-lg bg-primary/5 p-4">
          <Typography variant="base-semibold">{message}</Typography>
        </div>
        <Alert variant="warning">
          <AlertTitle>Unsupported message type</AlertTitle>
          <AlertDescription>
            This type of message is not supported by the Verida Vault web
            application.
          </AlertDescription>
        </Alert>
      </ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <div className="flex flex-row gap-4">
          <Button variant="outline" className="w-full" asChild>
            <ItemSheetClose>Close</ItemSheetClose>
          </Button>
        </div>
      </ItemSheetFooter>
    </>
  )
}
UnsupportedItemPageContent.displayName = "UnsupportedItemPageContent"
