import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import {
  MessageBlock,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import { MessageReadUnreadButton } from "@/app/(connected)/inbox/@item/_components/message-read-unread-button"
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
      <ItemSheetHeader
        right={
          <div className="flex flex-row items-center gap-3">
            <MessageReadUnreadButton messageRecord={inboxMessage} />
          </div>
        }
      >
        <ItemSheetTitle description="Invalid inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-6">
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
