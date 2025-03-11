import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { MarkMessageAsUnreadButton } from "@/app/(connected)/inbox/@item/_components/mark-message-as-unread-button"
import {
  ItemSheetBody,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/layouts/item-sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageBlock, MessageBlockBody } from "@/components/ui/message-block"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export interface InvalidItemPageContentProps {
  inboxMessage: VeridaInboxMessageRecord
  onMarkAsUnread?: () => void
}

export function InvalidItemPageContent(props: InvalidItemPageContentProps) {
  const { inboxMessage, onMarkAsUnread } = props

  return (
    <>
      <ItemSheetHeader
        right={
          <div className="flex flex-row items-center gap-3">
            <MarkMessageAsUnreadButton
              messageRecord={inboxMessage}
              onMarkAsUnread={onMarkAsUnread}
            />
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
          <MessageBlockBody>{`"${inboxMessage.message}"`}</MessageBlockBody>
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
