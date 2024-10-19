"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

import { DataRequestItem } from "@/app/(connected)/inbox/_components/data-request-item"
import { InboxDetailsProps } from "@/app/(connected)/inbox/_components/inbox-details"
import { InboxStatusText } from "@/app/(connected)/inbox/_components/inbox-status-text"
import { RequestDataSelector } from "@/app/(connected)/inbox/_components/request-data-selector"
import { RequesterProfile } from "@/app/(connected)/inbox/_components/requester-profile"
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/modal-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  SuccessBlock,
  SuccessBlockDescription,
  SuccessBlockImage,
  SuccessBlockTitle,
} from "@/components/ui/success"
import { InboxType } from "@/features/inbox/types"
import { useInboxAction } from "@/features/inbox/use-inbox-action"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("inbox")

// TODO: Use custom logger and remove this eslint by-pass
/* eslint-disable no-console */

export function DataRequestDetails(props: InboxDetailsProps) {
  const { message, onClose } = props
  const { message: title, data, type, sentBy } = message
  const { fallbackAction, requestSchema, filter } = data

  const [requestSchemaData, setRequestSchemaData] = useState<any>({})
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const [shared, setShared] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<any[]>(
    data.requestedData || []
  )

  const { handleAccept, handleReject, isLoading, isError } = useInboxAction()

  const onClickShare = async () => {
    try {
      setShared(false)
      await handleAccept(message, InboxType.DATA_REQUEST, selectedItems)
      setShared(true)
    } catch (error) {
      logger.error(error)
    }
  }

  const onRemoveChip = (_id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item._id !== _id))
  }

  const fetchData = useCallback(async () => {
    try {
      const { requestSchema } = data

      await fetch(requestSchema)
        .then((res) => res.json())
        .then((res) => {
          setRequestSchemaData({
            title: res.title,
            description: res.description,
          })
        })
    } catch (error) {
      logger.error(error)
    }
  }, [data])

  const onClickDecline = async () => {
    await handleReject(message)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <LoadingBlock className="flex-grow">
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Sharing...</LoadingBlockTitle>
            <LoadingBlockDescription>
              Please wait a moment
            </LoadingBlockDescription>
          </LoadingBlock>
        </ModalSheetBody>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockDescription>
              There was an error when sharing the data
            </ErrorBlockDescription>
            <Button variant="outline" onClick={onClickShare}>
              Try Again
            </Button>
          </ErrorBlock>
        </ModalSheetBody>
      </>
    )
  }

  if (shared) {
    return (
      <>
        <ModalSheetHeader
          title="Data Request"
          actions={<InboxStatusText status={data.status} />}
          onClose={onClose}
        />
        <ModalSheetBody>
          <SuccessBlock>
            <SuccessBlockImage />
            <SuccessBlockTitle>Success!</SuccessBlockTitle>
            <SuccessBlockDescription>
              You successfully shared{" "}
              <span className="font-semibold text-foreground">
                {requestSchemaData.title}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {sentBy.name}
              </span>
            </SuccessBlockDescription>
          </SuccessBlock>
        </ModalSheetBody>
        <ModalSheetFooter>
          <Button onClick={() => setShared(false)}>Done</Button>
        </ModalSheetFooter>
      </>
    )
  }

  if (isSelecting) {
    return (
      <RequestDataSelector
        schemaUrl={requestSchema}
        filter={filter}
        defaultItems={selectedItems}
        onClose={() => setIsSelecting(false)}
        onConfirm={(items: any[]) => {
          setSelectedItems(items)
          setIsSelecting(false)
        }}
      />
    )
  }

  return (
    <>
      <ModalSheetHeader
        title="Data Request"
        actions={<InboxStatusText status={data.status} inboxType={type} />}
        onClose={onClose}
      />

      <ModalSheetBody>
        <RequesterProfile sentAt={message.sentAt} sentBy={message.sentBy} />

        <div className="mt-6 rounded-lg bg-primary/5 p-4">
          <Typography variant="base-s-regular">{title}</Typography>
        </div>

        <div className="mt-8">
          <Typography variant="base-regular" className="text-muted-foreground">
            The following data is being requested
          </Typography>

          <DataRequestItem
            data={requestSchemaData}
            onAdd={() => setIsSelecting(true)}
            selectedItems={selectedItems}
            disabled={!!data.status}
            onRemoveChip={onRemoveChip}
          />
        </div>

        {fallbackAction && (
          <div>
            <Typography
              variant="base-regular"
              className="text-muted-foreground"
            >
              {`If you don't have the requested data`}
            </Typography>
            <Button asChild variant="outline" className="w-full">
              <Link
                href={fallbackAction.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fallbackAction.label}
              </Link>
            </Button>
          </div>
        )}
      </ModalSheetBody>

      <ModalSheetFooter>
        {data.status ? (
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        ) : (
          <>
            <Alert variant="warning">
              <AlertDescription>
                {`Decline if you don't recognize this request`}
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={onClickDecline}
              >
                Decline
              </Button>
              <Button
                disabled={isLoading || !selectedItems.length}
                onClick={onClickShare}
              >
                Share
              </Button>
            </div>
          </>
        )}
      </ModalSheetFooter>
    </>
  )
}
