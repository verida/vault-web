"use client"

import { useCallback, useMemo } from "react"

import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { InvalidItemPageContent } from "@/app/(connected)/inbox/@item/_components/invalid-item-page-content"
import {
  MessageBlock,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import { InboxIncoming } from "@/components/icons/inbox-incoming"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { Logger } from "@/features/telemetry/logger"
import { UnsavedVeridaRecord } from "@/features/verida-database/types"
import { InboxMessageStatusIndicator } from "@/features/verida-inbox/components/inbox.message-status-indicator"
import { VeridaInboxMessageTypeDataSendDataSchema } from "@/features/verida-inbox/schemas"
import {
  VeridaInboxMessageRecord,
  VeridaInboxMessageSupportedType,
} from "@/features/verida-inbox/types"
import { getVeridaMessageStatus } from "@/features/verida-inbox/utils"
import { cn } from "@/styles/utils"

const logger = Logger.create("verida-inbox")

const NOT_IMPLEMENTED_YET = true

export type IncomingDataItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
  onDecline: () => void
  onAccept: () => void
}

export function IncomingDataItemPageContent(
  props: IncomingDataItemPageContentProps
) {
  const { inboxMessage, onDecline, onAccept } = props

  const handleDecline = useCallback(() => {
    // TODO: Implement accept
    onDecline?.()
  }, [onDecline])

  const handleAccept = useCallback(() => {
    // TODO: Implement accept
    onAccept?.()
  }, [onAccept])

  const status = useMemo(
    () => getVeridaMessageStatus(inboxMessage.type, inboxMessage.data),
    [inboxMessage]
  )

  const data = useMemo(() => {
    if (inboxMessage.type !== VeridaInboxMessageSupportedType.DATA_SEND) {
      return null
    }

    try {
      return VeridaInboxMessageTypeDataSendDataSchema.parse(inboxMessage.data)
    } catch (error) {
      logger.warn("Failed to parse data of incoming data inbox message")
      return null
    }
  }, [inboxMessage])

  if (!data) {
    return <InvalidItemPageContent inboxMessage={inboxMessage} />
  }

  return (
    <>
      <ItemSheetHeader>
        <div className="flex flex-row items-baseline justify-between gap-2">
          <ItemSheetTitle
            description="Incoming data inbox message"
            className="flex-1 truncate"
          >
            <span className="flex flex-row items-center gap-2">
              <InboxIncoming className="size-5 shrink-0" />
              <span className="truncate">Incoming Data</span>
            </span>
          </ItemSheetTitle>
          <InboxMessageStatusIndicator
            messageType={inboxMessage.type}
            messageData={data}
          />
        </div>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-6">
        <InboxMessageHeader inboxMessage={inboxMessage} />
        <MessageBlock>
          <MessageBlockTitle>{inboxMessage.message}</MessageBlockTitle>
        </MessageBlock>
        {data.data && data.data.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="text-muted-foreground">
              <Typography variant="base-regular">
                Incoming data items:
              </Typography>
            </div>
            <ul className="flex flex-col gap-3">
              {data.data.map((item, index) => (
                <li key={index}>
                  <IncomingDataItemCard
                    item={item}
                    // TODO: Allow displaying the whole incoming record
                    // TODO: If accepted, allow navigating to that record (if still available). This requires storing the record id in the inbox message when accepting.
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Alert variant="warning">
            <AlertTitle>No data</AlertTitle>
            <AlertDescription>
              {`The content of this message doesn't contain any data.`}
            </AlertDescription>
          </Alert>
        )}
      </ItemSheetBody>
      {status ? (
        <ItemSheetFooter className="flex flex-col gap-3">
          {status === "pending" ? (
            <>
              {NOT_IMPLEMENTED_YET === true ? (
                <Alert variant="warning">
                  <AlertDescription>
                    {`Receiving incoming data is not implemented yet. Use your Verida Wallet in the meantime.`}
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <Alert variant="warning">
                    <AlertDescription>
                      {`Decline if you don't recognize this message`}
                    </AlertDescription>
                  </Alert>
                  <div className="flex flex-row gap-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleDecline}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={handleAccept}
                    >
                      Accept
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : status === "accepted" ? (
            <Alert variant="success">
              <AlertDescription>
                You accepted the data in this message
              </AlertDescription>
            </Alert>
          ) : status === "rejected" ? (
            <Alert variant="error">
              <AlertDescription>
                You declined the data in this message
              </AlertDescription>
            </Alert>
          ) : null}
        </ItemSheetFooter>
      ) : null}
    </>
  )
}
IncomingDataItemPageContent.displayName = "IncomingDataItemPageContent"

type IncomingDataItemCardProps = {
  item: UnsavedVeridaRecord
} & Omit<React.ComponentProps<typeof Card>, "children">

function IncomingDataItemCard(props: IncomingDataItemCardProps) {
  const { item, className, ...cardProps } = props

  return (
    <Card
      className={cn("flex flex-col gap-2 bg-surface-active p-4", className)}
      {...cardProps}
    >
      <div className="flex flex-row items-center gap-2">
        {item.icon ? (
          <Avatar className="size-8">
            <AvatarImage src={item.icon} alt="incoming-item-icon" />
            <AvatarFallback>
              {item.name?.charAt(0) || EMPTY_VALUE_FALLBACK}
            </AvatarFallback>
          </Avatar>
        ) : null}
        <div
          className={cn(
            "min-w-0",
            item.name ? "" : "italic text-muted-foreground"
          )}
        >
          <CardTitle variant="heading-5" component="p" className="truncate">
            {item.name || "No title"}
          </CardTitle>
        </div>
      </div>
      <div>
        <CardDescription
          variant="base-regular"
          className={cn("line-clamp-2", item.summary ? "" : "italic")}
        >
          {item.summary || "No description"}
        </CardDescription>
      </div>
    </Card>
  )
}
IncomingDataItemCard.displayName = "IncomingDataItemCard"
