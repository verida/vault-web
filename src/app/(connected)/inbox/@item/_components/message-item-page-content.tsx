import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type MessageItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function MessageItemPageContent(props: MessageItemPageContentProps) {
  const { inboxMessage } = props

  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Inbox message">Message</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
        <InboxMessageHeader inboxMessage={inboxMessage} />
      </ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <div className="flex flex-row gap-4">
          <Button variant="primary" className="w-full">
            Mark as read
          </Button>
        </div>
      </ItemSheetFooter>
    </>
  )
}
MessageItemPageContent.displayName = "MessageItemPageContent"
