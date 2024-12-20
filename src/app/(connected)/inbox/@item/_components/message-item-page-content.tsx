import Link from "next/link"
import { useMemo } from "react"

import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { InvalidItemPageContent } from "@/app/(connected)/inbox/@item/_components/invalid-item-page-content"
import {
  MessageBlock,
  MessageBlockBody,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
import { Logger } from "@/features/telemetry/logger"
import { VeridaInboxMessageTypeMessageDataSchema } from "@/features/verida-inbox/schemas"
import {
  VeridaInboxMessageRecord,
  VeridaInboxMessageSupportedType,
} from "@/features/verida-inbox/types"

const logger = Logger.create("verida-inbox")

export type MessageItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
}

export function MessageItemPageContent(props: MessageItemPageContentProps) {
  const { inboxMessage } = props

  const data = useMemo(() => {
    if (inboxMessage.type !== VeridaInboxMessageSupportedType.MESSAGE) {
      return null
    }

    try {
      return VeridaInboxMessageTypeMessageDataSchema.parse(inboxMessage.data)
    } catch (error) {
      logger.warn("Failed to parse data of message inbox message")
      return null
    }
  }, [inboxMessage])

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
    return <InvalidItemPageContent inboxMessage={inboxMessage} />
  }

  return (
    <>
      <ItemSheetHeader>
        <ItemSheetTitle description="Inbox message">Message</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
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
                  <span className="text-normal text-xs opacity-70">
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
