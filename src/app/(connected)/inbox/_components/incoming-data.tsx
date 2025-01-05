"use client"

import React from "react"

import { InboxStatusText } from "@/app/(connected)/inbox/_components/inbox-status-text"
import { IncomingDataItem } from "@/app/(connected)/inbox/_components/incoming-data-item"
import { RequesterProfile } from "@/app/(connected)/inbox/_components/requester-profile"
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/modal-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { InboxEntry, InboxType } from "@/features/inbox/types"
import { useInboxAction } from "@/features/inbox/use-inbox-action"

export type InboxDetailsProps = {
  message: InboxEntry
  onClose: () => void
}

/**
 * @deprecated
 */
export function InboxIncomingData(props: InboxDetailsProps) {
  const { message: inboxItem, onClose } = props
  const { message, data, sentAt, sentBy, type } = inboxItem

  const { handleAccept, handleReject, isLoading } = useInboxAction()

  const onClickAccept = async () => {
    await handleAccept(inboxItem, InboxType.DATA_SEND, {})
  }

  const onClickDecline = async () => {
    await handleReject(inboxItem)
  }

  return (
    <>
      <ModalSheetHeader
        title="Incoming Data"
        actions={<InboxStatusText status={data.status} inboxType={type} />}
        onClose={onClose}
      />

      <ModalSheetBody>
        <RequesterProfile sentAt={sentAt} sentBy={sentBy} />

        <div className="mt-6 rounded-lg bg-primary/5 p-4">
          <Typography>{message}</Typography>
        </div>

        <Typography
          variant="base-regular"
          className="mt-8 text-muted-foreground"
        >
          Incoming data item
        </Typography>

        <div className="mt-3 space-y-3">
          {data.data &&
            data.data.map((item: any, _ind: number) => (
              <IncomingDataItem
                item={item}
                key={`incoming-item-${item._id || _ind}`}
              />
            ))}
        </div>
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
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={onClickDecline}
                disabled={isLoading}
              >
                Decline
              </Button>
              <Button
                className="w-full"
                onClick={onClickAccept}
                disabled={isLoading}
              >
                Accept
              </Button>
            </div>
          </>
        )}
      </ModalSheetFooter>
    </>
  )
}
