"use client"

import React from "react"

import { InboxDetailsProps } from "@/app/(connected)/inbox/_components/inbox-details"
import { InboxStatusText } from "@/app/(connected)/inbox/_components/inbox-status-text"
import { IncomingDataItem } from "@/app/(connected)/inbox/_components/incoming-data-item"
import { RequesterProfile } from "@/app/(connected)/inbox/_components/requester-profile"
import { Alert } from "@/components/alert"
import {
  ModalSheetBody,
  ModalSheetFooter,
  ModalSheetHeader,
} from "@/components/modal-sheet"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction"
import { InboxType } from "@/features/inbox/types"

export function InboxIncomingData(props: InboxDetailsProps) {
  const { message, onClose } = props
  const { message: title, data, sentAt, sentBy, type } = message

  const { handleAccept, handleReject, isLoading } = useInboxAction()

  const onClickAccept = async () => {
    await handleAccept(message, InboxType.DATA_SEND, {})
  }

  const onClickDecline = async () => {
    await handleReject(message)
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

        <div className="mt-6 rounded-lg bg-purple-50 p-4">
          <Typography>{title}</Typography>
        </div>

        <Typography
          variant="base-regular"
          className="mt-8 text-secondary-foreground"
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
            <Alert text="Ignore if you don’t recognize this request" />
            <div className="flex gap-4">
              <Button
                variant="secondary"
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
