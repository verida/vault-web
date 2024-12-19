import {
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

export type UnsupportedItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function UnsupportedItemPageContent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: UnsupportedItemPageContentProps
) {
  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Unsupported inbox entry">
          Message
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>TODO: Unsupported inbox entry content</ItemSheetBody>
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
