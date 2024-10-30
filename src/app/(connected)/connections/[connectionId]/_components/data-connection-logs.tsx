"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"

import { dataConnectionLogsTableColumns } from "@/components/data-connections/logs-table/data-connection-logs-table-columns"
import { DataConnectionLogsTableRow } from "@/components/data-connections/logs-table/data-connection-logs-table-row"
import { DataTableHeader } from "@/components/data-table/data-table-header"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataConnectionLogs } from "@/features/data-connections/hooks/use-data-connection-logs"
import {
  DataConnection,
  DataConnectionSyncLog,
} from "@/features/data-connections/types"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { DataTablePaginationSizeValue } from "@/features/data-table/types"
import { VeridaRecord } from "@/features/verida-database/types"
import { cn } from "@/styles/utils"

const PAGINATION_SIZE_DEFAULT = 5

const PAGINATION_SIZES: DataTablePaginationSizeValue[] = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
]

const fallbackData: VeridaRecord<DataConnectionSyncLog>[] = []

const getRowId = (record: VeridaRecord<DataConnectionSyncLog>) => record._id

export type DataConnectionLogsProps = {
  connection: DataConnection
} & React.ComponentProps<"div">

export function DataConnectionLogs(props: DataConnectionLogsProps) {
  const { connection, className, ...divProps } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION_SIZE_DEFAULT,
  })

  const {
    logs,
    pagination: logsPaginationInfo,
    isLoading,
    isError,
    error,
  } = useDataConnectionLogs({
    providerId: connection.providerId,
    accountId: connection.accountId,
    options: {
      limit: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
    },
  })

  const table = useReactTable({
    data: logs ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: dataConnectionLogsTableColumns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: logsPaginationInfo?.unfilteredTotalRecordsCount ?? undefined,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      columnVisibility: {
        connection: false,
        level: false,
        handler: false,
      },
    },
  })

  return (
    <div className={cn("flex flex-1 flex-col gap-0", className)} {...divProps}>
      <div className="hidden md:block">
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTableHeader
            key={headerGroup.id}
            columnHeaders={headerGroup.headers}
          />
        ))}
      </div>
      {table.getRowModel().rows?.length ? (
        <ul className="flex flex-1 flex-col gap-3">
          {table.getRowModel().rows.map((row) => (
            <li key={row.id}>
              <DataConnectionLogsTableRow row={row} hideConnectionColumn />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          {isLoading ? (
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>Loading connections logs...</LoadingBlockTitle>
              <LoadingBlockDescription>
                Please wait while we load the connections logs.
              </LoadingBlockDescription>
            </LoadingBlock>
          ) : isError ? (
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Error</ErrorBlockTitle>
              <ErrorBlockDescription>
                There was an error getting the connections logs. Please try
                again later.
              </ErrorBlockDescription>
            </ErrorBlock>
          ) : (
            <EmptyState>
              <EmptyStateImage />
              <EmptyStateTitle>No connections logs yet</EmptyStateTitle>
              <EmptyStateDescription>
                {`There hasn't been any sync activities on your data connections yet.`}
              </EmptyStateDescription>
            </EmptyState>
          )}
        </div>
      )}
      <DataTablePagination
        table={table}
        paginationSizes={PAGINATION_SIZES}
        className="mt-6"
      />
    </div>
  )
}
DataConnectionLogs.displayName = "DataConnectionLogs"
