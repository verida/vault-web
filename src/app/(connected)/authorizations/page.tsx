"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"

import { authorizedAppsTableColumns } from "@/app/(connected)/authorizations/_components/authorized-apps-table-columns"
import { AuthorizedAppsTableRow } from "@/app/(connected)/authorizations/_components/authorized-apps-table-row"
import { DataTable } from "@/components/data-table/data-table"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useAuthorizedApps } from "@/features/authorized-apps/hooks/use-authorized-apps"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { useDataTableState } from "@/features/data-table/hooks/use-data-table-state"

const fallbackData: AuthorizedAppRecord[] = []

const getRowId = (record: AuthorizedAppRecord) => record._id

export default function AuthorizationsPage() {
  const { pagination, setPagination } = useDataTableState()

  const {
    authorizedApps,
    pagination: authorizedAppsPaginationInfo,
    isLoading,
    isFetching,
    isError,
  } = useAuthorizedApps({
    options: {
      limit: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
    },
  })

  const table = useReactTable({
    data: authorizedApps ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: authorizedAppsTableColumns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount:
      authorizedAppsPaginationInfo?.unfilteredTotalRecordsCount ?? undefined,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      columnVisibility: {
        id: false,
        url: false,
      },
    },
  })

  return (
    <DataTable
      table={table}
      rowComponent={(row) => <AuthorizedAppsTableRow row={row} />}
      className="flex-1"
      isLoading={isLoading}
      isRefreshing={isFetching}
      isError={isError}
      loadingTitle="Loading authorized apps..."
      loadingDescription="Please wait while we load the authorized apps."
      errorTitle="Error"
      errorDescription="There was an error getting the authorized apps. Please try again later."
      emptyStateTitle="No authorized apps yet"
      emptyStateDescription="There hasn't been any authorized apps yet."
    />
  )
}
AuthorizationsPage.displayName = "AuthorizationsPage"
