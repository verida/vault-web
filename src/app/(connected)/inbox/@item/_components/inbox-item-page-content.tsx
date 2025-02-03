"use client"

import { useCallback, useMemo } from "react"

import { DataRequestItemPageContent } from "@/app/(connected)/inbox/@item/_components/data-request-item-page-content"
import { IncomingDataItemPageContent } from "@/app/(connected)/inbox/@item/_components/incoming-data-item-page-content"
import { MessageItemPageContent } from "@/app/(connected)/inbox/@item/_components/message-item-page-content"
import { UnsupportedItemPageContent } from "@/app/(connected)/inbox/@item/_components/unsupported-item-page-content"
import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetContent,
  ItemSheetFooter,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { useGetVeridaInboxMessage } from "@/features/verida-inbox/hooks/use-get-verida-inbox-message"
import { useInboxMessageAutoRead } from "@/features/verida-inbox/hooks/use-inbox-message-auto-read"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxMessageSupportedType } from "@/features/verida-inbox/types"

export type ItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemId: string
}

export function InboxItemPageContent(props: ItemPageContentProps) {
  const { open, onOpenChange, itemId } = props

  const { messagingEngineStatus } = useVeridaInbox()
  const { inboxMessageRecord, isLoading, isError } = useGetVeridaInboxMessage({
    messageRecordId: itemId,
  })

  useInboxMessageAutoRead({
    messageRecord: inboxMessageRecord,
    disabled: !open,
  })

  const closeSheet = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  // TODO: Set the `read` property to true when the message is opened

  const content = useMemo(() => {
    if (inboxMessageRecord) {
      switch (inboxMessageRecord.type) {
        case VeridaInboxMessageSupportedType.MESSAGE:
          return (
            <MessageItemPageContent
              inboxMessage={inboxMessageRecord}
              onMarkAsUnread={closeSheet}
            />
          )
        case VeridaInboxMessageSupportedType.DATA_REQUEST:
          return (
            <DataRequestItemPageContent
              inboxMessage={inboxMessageRecord}
              onAccept={closeSheet}
              onDecline={closeSheet}
              onMarkAsUnread={closeSheet}
            />
          )
        case VeridaInboxMessageSupportedType.DATA_SEND:
          return (
            <IncomingDataItemPageContent
              inboxMessage={inboxMessageRecord}
              onAccept={closeSheet}
              onDecline={closeSheet}
              onMarkAsUnread={closeSheet}
            />
          )
        default:
          return (
            <UnsupportedItemPageContent
              inboxMessage={inboxMessageRecord}
              onMarkAsUnread={closeSheet}
            />
          )
      }
    }

    // If the inbox message record is not found, show a loading or error block
    return (
      <>
        <ItemSheetBody>
          <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
            {isLoading || messagingEngineStatus === "loading" ? (
              <LoadingBlock>
                <LoadingBlockSpinner />
                <LoadingBlockTitle>Loading message...</LoadingBlockTitle>
                <LoadingBlockDescription>
                  Please wait while we fetch your message details.
                </LoadingBlockDescription>
              </LoadingBlock>
            ) : isError || messagingEngineStatus === "error" ? (
              <ErrorBlock>
                <ErrorBlockImage />
                <ErrorBlockTitle>Error loading message</ErrorBlockTitle>
                <ErrorBlockDescription>
                  There was an error retrieving the message. Please try again
                  later.
                </ErrorBlockDescription>
              </ErrorBlock>
            ) : (
              <ErrorBlock>
                <ErrorBlockImage />
                <ErrorBlockTitle>Message not found</ErrorBlockTitle>
                <ErrorBlockDescription>
                  This message could not be found.
                </ErrorBlockDescription>
              </ErrorBlock>
            )}
          </div>
        </ItemSheetBody>
        <ItemSheetFooter>
          <Button variant="outline" className="w-full" asChild>
            <ItemSheetClose>Close</ItemSheetClose>
          </Button>
        </ItemSheetFooter>
      </>
    )
  }, [
    inboxMessageRecord,
    isLoading,
    isError,
    messagingEngineStatus,
    closeSheet,
  ])

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>{content}</ItemSheetContent>
    </ItemSheet>
  )
}
InboxItemPageContent.displayName = "InboxItemPageContent"
