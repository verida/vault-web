"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { inboxMessagesTableColumns } from "@/app/(connected)/inbox/_components/inbox-messages-table-columns"
import { InboxMessagesTableRow } from "@/app/(connected)/inbox/_components/inbox-messages-table-row"
import EmptyInboxIllustration from "@/assets/empty-inbox-illustration.svg"
import { DataTable } from "@/components/data-table/data-table"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { useDataTableState } from "@/features/data-table/hooks/use-data-table-state"
import { useGetVeridaInboxMessages } from "@/features/verida-inbox/hooks/use-get-verida-inbox-messages"
import { useInboxMessageItemIdState } from "@/features/verida-inbox/hooks/use-inbox-message-item-id-state"
import { useVeridaInbox } from "@/features/verida-inbox/hooks/use-verida-inbox"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"

const fallbackData: VeridaInboxMessageRecord[] = []

const getRowId = (record: VeridaInboxMessageRecord) => record._id

export default function InboxPage() {
  const searchParams = useSearchParams()

  const { pagination, setPagination } = useDataTableState()

  const { messagingEngineStatus } = useVeridaInbox()
  const {
    inboxMessageRecords,
    pagination: inboxMessagesPaginationInfo,
    isLoading,
    isFetching,
    isError,
  } = useGetVeridaInboxMessages({
    options: {
      limit: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
    },
  })

  const table = useReactTable({
    data: inboxMessageRecords ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: inboxMessagesTableColumns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount:
      inboxMessagesPaginationInfo?.unfilteredTotalRecordsCount ?? undefined,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {},
  })

  const { serializeItemId } = useInboxMessageItemIdState()

  return (
    <DataTable
      table={table}
      rowComponent={(row) => (
        <Link
          href={serializeItemId(`?${searchParams.toString()}`, {
            itemId: row.original._id,
          })}
          className="rounded-lg"
        >
          <InboxMessagesTableRow
            row={row}
            className="hover:border-border-hover hover:bg-surface-hover"
          />
        </Link>
      )}
      className="flex-1"
      isLoading={isLoading || messagingEngineStatus === "loading"}
      isRefreshing={isFetching}
      isError={isError}
      loadingTitle="Loading messages..."
      loadingDescription="Please wait while we load your messages."
      errorTitle="Error"
      errorDescription="There was an error getting your messages. Please try again later."
      emptyStateImage={
        <Image
          src={EmptyInboxIllustration}
          width={109}
          height={140}
          alt=""
          className="h-[109px] md:h-[140px]"
        />
      }
      emptyStateTitle="No messages yet"
      emptyStateDescription="You haven't received any messages yet."
    />
  )
}
InboxPage.displayName = "InboxPage"
