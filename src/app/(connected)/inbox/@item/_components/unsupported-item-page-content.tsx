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

export type UnsupportedItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function UnsupportedItemPageContent(
  props: UnsupportedItemPageContentProps
) {
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
        <ItemSheetTitle description="Unsupported inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-6">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <MessageBlock>
          <MessageBlockTitle>{inboxMessage.message}</MessageBlockTitle>
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
