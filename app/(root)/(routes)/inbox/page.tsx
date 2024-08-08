"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

import { ModalSheet } from "@/components/common/modal-sheet"
import { FilterButton } from "@/components/filter-button"
import { InboxDetails } from "@/components/inbox/inbox-details"
import { InboxRowItem } from "@/components/inbox/inbox-item"
import { InboxError } from "@/components/inbox/status/inbox-error"
import { InboxLoading } from "@/components/inbox/status/inbox-loading"
import { NoInbox } from "@/components/inbox/status/no-inbox"
import { SearchInput } from "@/components/search-input"
import { Typography } from "@/components/typography"
import { TablePagination } from "@/components/ui/table-pagination"
import { useInbox } from "@/features/inbox/hooks"
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext"
import { useMessages } from "@/features/inbox/hooks/useMessages"
import { InboxEntry } from "@/features/inbox/types"

const InboxPage = () => {
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
      <div className="flex flex-grow flex-col space-y-6 pb-6 pt-10">
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
          <InboxLoading
            title="Please wait..."
            description="We are fetching your latest messages"
          />
        )}

        {hasError && (
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

export default InboxPage
