import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import {
  MessageBlock,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import {
  ItemSheetBody,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type InvalidItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function InvalidItemPageContent(props: InvalidItemPageContentProps) {
  const { inboxMessage } = props

  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Invalid inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <MessageBlock>
          <MessageBlockTitle>{inboxMessage.message}</MessageBlockTitle>
        </MessageBlock>
        <Alert variant="warning">
          <AlertTitle>Invalid message</AlertTitle>
          <AlertDescription>
            The content of this message is invalid and cannot be displayed
            properly.
          </AlertDescription>
        </Alert>
      </ItemSheetBody>
    </>
  )
}
InvalidItemPageContent.displayName = "InvalidItemPageContent"
