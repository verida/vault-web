"use client"

import Link from "next/link"
import { useMemo } from "react"

import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { InvalidItemPageContent } from "@/app/(connected)/inbox/@item/_components/invalid-item-page-content"
import { MarkMessageAsUnreadButton } from "@/app/(connected)/inbox/@item/_components/mark-message-as-unread-button"
import {
  MessageBlock,
  MessageBlockBody,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import { InboxMessageTypeIcon } from "@/components/icons/inbox-message"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import { getDataFromMessage } from "@/features/verida-inbox/utils"

export type MessageItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
  onMarkAsUnread?: () => void
}

export function MessageItemPageContent(props: MessageItemPageContentProps) {
  const { inboxMessage, onMarkAsUnread } = props

  const data = useMemo(() => getDataFromMessage(inboxMessage), [inboxMessage])

  const parsedLink = useMemo(() => {
    if (!data?.link?.url) {
      return null
    }

    return {
      url: new URL(data.link.url),
      text: data.link.text || "Open link",
    }
  }, [data])

  if (!data) {
    return (
      <InvalidItemPageContent
        inboxMessage={inboxMessage}
        onMarkAsUnread={onMarkAsUnread}
      />
    )
  }

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
        <ItemSheetTitle description="Inbox message">
          <span className="flex flex-row items-center gap-2">
            <InboxMessageTypeIcon className="size-5" />
            Message
          </span>
        </ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-6">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <MessageBlock>
          <MessageBlockTitle>{data.subject}</MessageBlockTitle>
          <MessageBlockBody>{data.message}</MessageBlockBody>
        </MessageBlock>
      </ItemSheetBody>
      {parsedLink ? (
        <ItemSheetFooter className="flex flex-col gap-3">
          <div className="flex flex-row gap-4">
            <Button variant="primary" className="w-full" asChild>
              <Link
                href={parsedLink.url.toString()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex flex-col items-center gap-0">
                  <span>{parsedLink.text}</span>
                  <span className="text-xs font-normal opacity-80">
                    {`${parsedLink.url.protocol}//${parsedLink.url.hostname}`}
                  </span>
                </div>
              </Link>
            </Button>
          </div>
        </ItemSheetFooter>
      ) : null}
    </>
  )
}
MessageItemPageContent.displayName = "MessageItemPageContent"
