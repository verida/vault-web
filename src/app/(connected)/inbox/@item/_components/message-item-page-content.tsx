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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MessageItemPageContent(_props: MessageItemPageContentProps) {
  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Inbox message">Message</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Message content</ItemSheetBody>
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
