"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

import { DataRequestItemPageDataSelection } from "@/app/(connected)/inbox/@item/_components/data-request-item-page-data-selection"
import { DataRequestItemPageRequestedDataCard } from "@/app/(connected)/inbox/@item/_components/data-request-item-page-requested-data-card"
import { InboxMessageHeader } from "@/app/(connected)/inbox/@item/_components/inbox-message-header"
import { InvalidItemPageContent } from "@/app/(connected)/inbox/@item/_components/invalid-item-page-content"
import { MarkMessageAsUnreadButton } from "@/app/(connected)/inbox/@item/_components/mark-message-as-unread-button"
import { ResetMessageStatusButton } from "@/app/(connected)/inbox/@item/_components/reset-message-status-button"
import { InboxDataRequestTypeIcon } from "@/components/icons/inbox-data"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/layouts/item-sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MessageBlock, MessageBlockBody } from "@/components/ui/message-block"
import { Typography } from "@/components/ui/typography"
import { commonConfig } from "@/config/common"
import { VeridaRecord } from "@/features/verida-database/types"
import { InboxMessageStatusIndicator } from "@/features/verida-inbox/components/inbox.message-status-indicator"
import { useAcceptDataRequestMessage } from "@/features/verida-inbox/hooks/use-accept-data-request-message"
import { useDeclineDataRequestMessage } from "@/features/verida-inbox/hooks/use-decline-data-request-message"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import {
  getDataFromDataRequestMessage,
  getVeridaMessageStatus,
} from "@/features/verida-inbox/utils"
import { cn } from "@/styles/utils"

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

  const [isSelectionPageDisplayed, setIsSelectionPageDisplayed] =
    useState(false)

  const displaySelectionPage = useCallback(() => {
    setIsSelectionPageDisplayed(true)
  }, [])

  const hideSelectionPage = useCallback(() => {
    setIsSelectionPageDisplayed(false)
  }, [])

  const [selectedDataItems, setSelectedDataItems] = useState<VeridaRecord[]>([])

  const [processing, setProcessing] = useState(false)
  const { acceptAsync } = useAcceptDataRequestMessage()
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

  const handleAccept = useCallback(async () => {
    setProcessing(true)
    try {
      await acceptAsync({
        messageRecord: inboxMessage,
        selectedDataItems,
      })
      onAccept?.()
    } catch (error) {
      // Error handled by the mutation hook
    } finally {
      setProcessing(false)
    }
  }, [acceptAsync, onAccept, inboxMessage, selectedDataItems])

  const handleSelectClick = useCallback(() => {
    displaySelectionPage()
  }, [displaySelectionPage])

  const handleSelectDataItem = useCallback((dataItemRecord: VeridaRecord) => {
    setSelectedDataItems((prev) => [...prev, dataItemRecord])
  }, [])

  const handleRemoveSelectedDataItem = useCallback((itemId: string) => {
    setSelectedDataItems((prev) => prev.filter((item) => item._id !== itemId))
  }, [])

  const status = useMemo(
    () => getVeridaMessageStatus(inboxMessage.type, inboxMessage.data),
    [inboxMessage]
  )

  const data = useMemo(
    () => getDataFromDataRequestMessage(inboxMessage),
    [inboxMessage]
  )

  const alreadySharedData = useMemo(() => {
    if (data?.sharedData) {
      return data.sharedData as VeridaRecord[]
    }

    if (data?.requestedData) {
      return data.requestedData as VeridaRecord[]
    }

    return [] as VeridaRecord[]
  }, [data])

  const parsedFallbackLink = useMemo(() => {
    if (!data?.fallbackAction?.url) {
      return null
    }

    return {
      url: new URL(data.fallbackAction.url),
      label: data.fallbackAction.label || "Open",
    }
  }, [data])

  if (!data || !data.userSelect) {
    // TODO: Add support for the userSelect=false case, e.g. the user doesn't chose which data is shared, it is expected to be done automatically via a query

    return (
      <InvalidItemPageContent
        inboxMessage={inboxMessage}
        onMarkAsUnread={onMarkAsUnread}
      />
    )
  }

  return (
    <>
      {isSelectionPageDisplayed ? (
        <DataRequestItemPageDataSelection
          requestedDataSchemaUrl={data.requestSchema}
          filter={data.filter}
          selectionLimit={data.userSelectLimit}
          selectedDataItems={selectedDataItems}
          onClickBack={hideSelectionPage}
          onSelectDataItem={handleSelectDataItem}
          onUnselectDataItem={handleRemoveSelectedDataItem}
        />
      ) : (
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
            <div className="flex flex-row items-center justify-between gap-2 sm:justify-start">
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
              <MessageBlockBody>{`"${inboxMessage.message}"`}</MessageBlockBody>
            </MessageBlock>
            <div className="flex flex-col gap-3">
              <div className="text-muted-foreground">
                <Typography variant="base-regular">Requested data:</Typography>
              </div>
              <DataRequestItemPageRequestedDataCard
                requestedItemSchemaUrl={data.requestSchema}
                selectedDataItems={
                  status === "pending"
                    ? selectedDataItems
                    : status === "accepted"
                      ? alreadySharedData
                      : []
                }
                disableSelection={status !== "pending"}
                disableRemoveItems={status !== "pending"}
                onRemoveItem={handleRemoveSelectedDataItem}
                onClickSelect={handleSelectClick}
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
                        {parsedFallbackLink.url.origin}
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
                      disabled={processing || selectedDataItems.length === 0}
                    >
                      Share
                    </Button>
                  </div>
                </>
              ) : status === "accepted" ? (
                <Alert variant="success">
                  <AlertDescription>
                    You responded to this request
                  </AlertDescription>
                </Alert>
              ) : status === "declined" ? (
                <Alert variant="error">
                  <AlertDescription>You declined this request</AlertDescription>
                </Alert>
              ) : null}
            </ItemSheetFooter>
          ) : null}
        </>
      )}
    </>
  )
}
DataRequestItemPageContent.displayName = "DataRequestItemPageContent"
