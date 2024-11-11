"use client"

import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { dataConnectionLogsTableColumns } from "@/components/data-connections/logs-table/data-connection-logs-table-columns"
import { DataConnectionLogsTableRow } from "@/components/data-connections/logs-table/data-connection-logs-table-row"
import { DataTable } from "@/components/data-table/data-table"
import { PageWrapper } from "@/components/page-wrapper"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataConnectionsLogs } from "@/features/data-connections/hooks/use-data-connections-logs"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { DATA_TABLE_PAGINATION_SIZE_DEFAULT } from "@/features/data-table/constants"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { VeridaRecord } from "@/features/verida-database/types"

const fallbackData: VeridaRecord<DataConnectionSyncLog>[] = []

const getRowId = (record: VeridaRecord<DataConnectionSyncLog>) => record._id

export default function ConnectionsLogsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DATA_TABLE_PAGINATION_SIZE_DEFAULT,
  })

  const {
    logs,
    pagination: logsPaginationInfo,
    isLoading,
    isFetching,
    isError,
  } = useDataConnectionsLogs({
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
        level: false,
        handler: false,
      },
    },
  })

  return (
    <PageWrapper pageTitle="Connection Logs">
      <DataTable
        table={table}
        rowComponent={(row) => <DataConnectionLogsTableRow row={row} />}
        className="flex-1"
        isLoading={isLoading}
        isRefreshing={isFetching}
        isError={isError}
        loadingTitle="Loading connections logs..."
        loadingDescription="Please wait while we load the connections logs."
        errorTitle="Error"
        errorDescription="There was an error getting the connections logs. Please try again later."
        emptyStateTitle="No connections logs yet"
        emptyStateDescription="There hasn't been any sync activities on your data connections yet."
      />
    </PageWrapper>
  )
}
ConnectionsLogsPage.displayName = "ConnectionsLogsPage"
