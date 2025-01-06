"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { InvalidItemPageContent } from "@/app/(connected)/inbox/@item/_components/invalid-item-page-content"
import { MarkMessageAsUnreadButton } from "@/app/(connected)/inbox/@item/_components/mark-message-as-unread-button"
import {
  MessageBlock,
  MessageBlockTitle,
} from "@/app/(connected)/inbox/@item/_components/message-block"
import { ResetMessageStatusButton } from "@/app/(connected)/inbox/@item/_components/reset-message-status-button"
import { InboxDataRequestTypeIcon } from "@/components/icons/inbox-data"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { commonConfig } from "@/config/common"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataSchema_legacy } from "@/features/verida-data-schemas/hooks/use-data-schema-legacy"
import { InboxMessageStatusIndicator } from "@/features/verida-inbox/components/inbox.message-status-indicator"
import { useDeclineDataRequestMessage } from "@/features/verida-inbox/hooks/use-decline-data-request-message"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import {
  getDataFromDataRequestMessage,
  getVeridaMessageStatus,
} from "@/features/verida-inbox/utils"
import { cn } from "@/styles/utils"

const NOT_IMPLEMENTED_YET = true

export type DataRequestItemPageContentProps = {
  inboxMessage: VeridaInboxMessageRecord
  onDecline: () => void
  onAccept: () => void
  onMarkAsUnread?: () => void
}

export function DataRequestItemPageContent(
  props: DataRequestItemPageContentProps
) {
  const { inboxMessage, onDecline, onAccept, onMarkAsUnread } = props

  const [processing, setProcessing] = useState(false)
  const { declineAsync } = useDeclineDataRequestMessage()

  const handleDecline = useCallback(async () => {
    setProcessing(true)
    try {
      await declineAsync({ messageRecord: inboxMessage })
      onDecline?.()
    } catch (error) {
      // Error handled by the mutation hook
    } finally {
      setProcessing(false)
    }
  }, [inboxMessage, declineAsync, onDecline])

  const handleAccept = useCallback(() => {
    // TODO: Implement accept
    onAccept?.()
  }, [onAccept])

  const status = useMemo(
    () => getVeridaMessageStatus(inboxMessage.type, inboxMessage.data),
    [inboxMessage]
  )

  const data = useMemo(
    () => getDataFromDataRequestMessage(inboxMessage),
    [inboxMessage]
  )

  const parsedFallbackLink = useMemo(() => {
    if (!data?.fallbackAction?.url) {
      return null
    }

    return {
      url: new URL(data.fallbackAction.url),
      label: data.fallbackAction.label || "Open",
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
            {(status === "accepted" || status === "declined") &&
            commonConfig.DEV_MODE ? (
              <ResetMessageStatusButton messageRecord={inboxMessage} />
            ) : null}
            <MarkMessageAsUnreadButton
              messageRecord={inboxMessage}
              onMarkAsUnread={onMarkAsUnread}
            />
          </div>
        }
      >
        <div className="flex flex-row items-center justify-between gap-2">
          <ItemSheetTitle description="Data request inbox message">
            <span className="flex flex-row items-center gap-2">
              <InboxDataRequestTypeIcon className="size-5 shrink-0" />
              <span className="truncate">Data Request</span>
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
        <div className="flex flex-col gap-3">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Requested data:</Typography>
          </div>
          <RequestedItemCard
            requestedItemSchemaUrl={data.requestSchema}
            disableSelection={status !== "pending"}
            className={cn(
              status === "accepted"
                ? "bg-status-added text-status-added-foreground"
                : ""
            )}
          />
        </div>
        {status === "pending" && parsedFallbackLink ? (
          <div className="flex flex-col gap-3">
            <div className="text-muted-foreground">
              <Typography variant="base-regular">
                {`If you don't have the requested data:`}
              </Typography>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link
                href={parsedFallbackLink.url.toString()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col items-center gap-0">
                  <span>{parsedFallbackLink.label}</span>
                  <span className="text-normal text-xs opacity-70">
                    {`${parsedFallbackLink.url.protocol}//${parsedFallbackLink.url.hostname}`}
                  </span>
                </div>
              </Link>
            </Button>
          </div>
        ) : null}
      </ItemSheetBody>
      {status ? (
        <ItemSheetFooter className="flex flex-col gap-3">
          {status === "pending" ? (
            <>
              {NOT_IMPLEMENTED_YET === true ? (
                <Alert variant="warning">
                  <AlertDescription>
                    {`Responding to data request is not implemented yet. Use your Verida Wallet in the meantime.`}
                  </AlertDescription>
                </Alert>
              ) : null}
              <Alert variant="warning">
                <AlertDescription>
                  {`Decline if you don't recognize this request`}
                </AlertDescription>
              </Alert>
              <div className="flex flex-row gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDecline}
                  disabled={processing}
                >
                  Decline
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleAccept}
                  disabled={processing || NOT_IMPLEMENTED_YET}
                >
                  Share
                </Button>
              </div>
            </>
          ) : status === "accepted" ? (
            <Alert variant="success">
              <AlertDescription>You responded to this request</AlertDescription>
            </Alert>
          ) : status === "declined" ? (
            <Alert variant="error">
              <AlertDescription>You declined this request</AlertDescription>
            </Alert>
          ) : null}
        </ItemSheetFooter>
      ) : null}
    </>
  )
}
DataRequestItemPageContent.displayName = "DataRequestItemPageContent"

type RequestedItemCardProps = {
  requestedItemSchemaUrl: string
  disableSelection?: boolean
  handleSelect?: () => void
} & Omit<React.ComponentProps<typeof Card>, "children">

function RequestedItemCard(props: RequestedItemCardProps) {
  const {
    requestedItemSchemaUrl,
    disableSelection,
    handleSelect,
    className,
    ...cardProps
  } = props

  const { dataSchema } = useDataSchema_legacy(requestedItemSchemaUrl)
  // TODO: Handle schema loading and error

  // TODO: Handle selected items

  return (
    <Card
      className={cn("flex flex-col gap-2 bg-surface-active p-4", className)}
      {...cardProps}
    >
      <div className="flex flex-row items-center gap-2">
        {dataSchema?.appearance?.style?.icon ? (
          <Avatar className="size-8">
            <AvatarImage
              src={dataSchema.appearance.style.icon}
              alt="incoming-item-icon"
            />
            <AvatarFallback>
              {dataSchema.title?.at(0) || EMPTY_VALUE_FALLBACK}
            </AvatarFallback>
          </Avatar>
        ) : null}
        <div
          className={cn(
            "min-w-0",
            dataSchema?.title ? "" : "italic text-muted-foreground"
          )}
        >
          <CardTitle variant="heading-5" component="p" className="truncate">
            {dataSchema?.title || "No title"}
          </CardTitle>
        </div>
      </div>
      <div>
        <CardDescription
          variant="base-regular"
          className={cn(
            "line-clamp-2",
            dataSchema?.description ? "" : "italic"
          )}
        >
          {dataSchema?.description || "No description"}
        </CardDescription>
      </div>
      <CardBody className="p-0"></CardBody>
      {disableSelection ? null : (
        <CardFooter className="p-0">
          <Button
            variant="outline"
            className="w-full gap-2"
            disabled={NOT_IMPLEMENTED_YET}
            onClick={handleSelect}
          >
            Select
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
