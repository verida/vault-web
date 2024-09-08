"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

import { InboxDetails } from "@/app/(connected)/inbox/_components/inbox-details"
import { InboxError } from "@/app/(connected)/inbox/_components/inbox-error"
import { InboxRowItem } from "@/app/(connected)/inbox/_components/inbox-item"
import { NoInbox } from "@/app/(connected)/inbox/_components/no-inbox"
// import { FilterButton } from "@/components/filter-button"
import { ModalSheet } from "@/components/modal-sheet"
// import { SearchInput } from "@/components/search-input"
import { Typography } from "@/components/typography"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { TablePagination } from "@/components/ui/table-pagination"
import { useInbox } from "@/features/inbox/hooks"
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext"
import { useMessages } from "@/features/inbox/hooks/useMessages"
import { InboxEntry } from "@/features/inbox/types"

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
    <>
      <div className="flex flex-grow flex-col space-y-6 pb-6">
        <div className="flex items-center justify-between">
          <Typography variant="heading-3">Inbox</Typography>
          <nav className="flex space-x-2 md:w-auto md:space-x-3">
            {/* <SearchInput
              onValueChange={handleSearchInputChange}
              className="md:flex-grow"
            />
            <FilterButton /> */}
          </nav>
        </div>

        {isLoading && (
          <LoadingBlock className="flex-grow">
            <LoadingBlockSpinner />
            <LoadingBlockTitle>Please wait...</LoadingBlockTitle>
            <LoadingBlockDescription>
              We are fetching your latest messages
            </LoadingBlockDescription>
          </LoadingBlock>
        )}

        {hasError && (
          // TODO: Leverage the Error Boundary instead?
          <InboxError description="There was an error getting your inbox messages, please try again later" />
        )}

        {!isLoading && totalMessageCount === 0 && <NoInbox />}

        {!isLoading && messages && (
          <div className="flex flex-grow flex-col items-center gap-3">
            {messages.map((message: any) => (
              <InboxRowItem
                key={`inbox-row-${message._id}`}
                message={message}
                href={`?id=${message._id}`}
              />
            ))}
          </div>
        )}

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
    </>
  )
}
InboxPage.displayName = "InboxPage"
