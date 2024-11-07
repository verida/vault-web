"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"

import { dataConnectionLogsTableColumns } from "@/components/data-connections/logs-table/data-connection-logs-table-columns"
import { DataConnectionLogsTableRow } from "@/components/data-connections/logs-table/data-connection-logs-table-row"
import { DataTable } from "@/components/data-table/data-table"
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
} & Pick<React.ComponentProps<typeof DataTable>, "className">

export function DataConnectionLogs(props: DataConnectionLogsProps) {
  const { connection, className } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGINATION_SIZE_DEFAULT,
  })

  const {
    logs,
    pagination: logsPaginationInfo,
    isLoading,
    isError,
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
    <DataTable
      table={table}
      rowComponent={(row) => (
        <DataConnectionLogsTableRow row={row} hideConnectionColumn />
      )}
      className={className}
      paginationSizes={PAGINATION_SIZES}
      isLoading={isLoading}
      isError={isError}
      loadingTitle="Loading connections logs..."
      loadingDescription="Please wait while we load the connections logs."
      errorTitle="Error"
      errorDescription="There was an error getting the connections logs. Please try again later."
      emptyStateTitle="No connections logs yet"
      emptyStateDescription="There hasn't been any sync activities on your data connections yet."
    />
  )
}
DataConnectionLogs.displayName = "DataConnectionLogs"
