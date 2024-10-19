"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

import { InboxDetails } from "@/app/(connected)/inbox/_components/inbox-details"
import { InboxRowItem } from "@/app/(connected)/inbox/_components/inbox-item"
import { NoInbox } from "@/app/(connected)/inbox/_components/no-inbox"
import { ModalSheet } from "@/components/modal-sheet"
import { PageWrapper } from "@/components/page-wrapper"
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
import { TablePagination } from "@/components/ui/table-pagination"
import { InboxEntry } from "@/features/inbox/types"
import { useInbox } from "@/features/inbox/use-inbox"
import { useInboxContext } from "@/features/inbox/use-inbox-context"
import { useMessages } from "@/features/inbox/use-messages"

export default function InboxPage() {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  const { messagingEngine } = useInboxContext()
  const {
    totalMessageCount,
    isTotalMessageCountPending,
    isUnreadMessageCountPending,
    isTotalMessageCountError,
    isUnreadMessageCountError,
  } = useInbox()
  const { messages, isMessagesPending } = useMessages(
    messagingEngine,
    {},
    offset,
    limit
  )

  const messageId = searchParams.get("id")

  const selectedMessage = messages?.find(
    (message: any) => message._id === messageId
  ) as InboxEntry

  const isLoading = useMemo(() => {
    return (
      isTotalMessageCountPending ||
      isUnreadMessageCountPending ||
      isMessagesPending
    )
  }, [
    isTotalMessageCountPending,
    isUnreadMessageCountPending,
    isMessagesPending,
  ])

  const hasError = useMemo(() => {
    return isTotalMessageCountError || isUnreadMessageCountError
  }, [isTotalMessageCountError, isUnreadMessageCountError])

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset)
    setLimit(newLimit)
  }

  return (
    <PageWrapper pageTitle="Inbox">
      {isLoading && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <LoadingBlock>
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Please wait...</LoadingBlockTitle>
            <LoadingBlockDescription>
              We are fetching your latest messages
            </LoadingBlockDescription>
          </LoadingBlock>
        </div>
      )}
      {hasError && (
        // TODO: Leverage the Error Boundary instead?

        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockDescription>
            There was an error getting your inbox messages, please try again
            later
          </ErrorBlockDescription>
        </ErrorBlock>
      )}
      <div className="flex flex-col gap-6">
        {!isLoading && totalMessageCount === 0 ? <NoInbox /> : null}
        {!isLoading && messages ? (
          <div className="flex flex-grow flex-col items-center gap-3">
            {messages.map((message: any) => (
              <InboxRowItem
                key={`inbox-row-${message._id}`}
                message={message}
                href={`?id=${message._id}`}
              />
            ))}
          </div>
        ) : null}
        <TablePagination
          totalItems={totalMessageCount}
          onChange={handlePageChange}
        />
      </div>
      <ModalSheet
        open={Boolean(messageId)}
        onClose={() => router.push(pathName)}
      >
        {selectedMessage && (
          <InboxDetails
            message={selectedMessage}
            onClose={() => router.push(pathName)}
          />
        )}
      </ModalSheet>
    </PageWrapper>
  )
}
InboxPage.displayName = "InboxPage"
