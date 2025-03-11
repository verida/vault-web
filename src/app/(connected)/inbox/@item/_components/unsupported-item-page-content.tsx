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

export type UnsupportedItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
  onMarkAsUnread?: () => void
}

export function UnsupportedItemPageContent(
  props: UnsupportedItemPageContentProps
) {
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
        <ItemSheetTitle description="Unsupported inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-6">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <MessageBlock>
          <MessageBlockBody>{`"${inboxMessage.message}"`}</MessageBlockBody>
        </MessageBlock>
        <Alert variant="warning">
          <AlertTitle>Unsupported message type</AlertTitle>
          <AlertDescription>
            This type of message is not supported by the Verida Vault web
            application.
          </AlertDescription>
        </Alert>
      </ItemSheetBody>
    </>
  )
}
UnsupportedItemPageContent.displayName = "UnsupportedItemPageContent"
