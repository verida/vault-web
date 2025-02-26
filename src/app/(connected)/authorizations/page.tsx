"use client"

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from "react"

import { authorizedAppsTableColumns } from "@/app/(connected)/authorizations/_components/authorized-apps-table-columns"
import { AuthorizedAppsTableRow } from "@/app/(connected)/authorizations/_components/authorized-apps-table-row"
import { DataTable } from "@/components/data-table/data-table"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useAuthorizedAppItemIdState } from "@/features/authorized-apps/hooks/use-authorized-app-item-id-state"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { useDataTableState } from "@/features/data-table/hooks/use-data-table-state"
import { useVeridaAuthTokens } from "@/features/verida-auth/hooks/use-verida-auth-tokens"
import { VeridaAuthToken } from "@/features/verida-auth/types"

const fallbackData: VeridaAuthToken[] = []

const getRowId = (record: VeridaAuthToken) => record._id

export default function AuthorizationsPage() {
  const { pagination, setPagination } = useDataTableState()

  const { tokens, isLoading, isFetching, isError } = useVeridaAuthTokens()

  const table = useReactTable({
    data: tokens ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: authorizedAppsTableColumns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    rowCount: tokens?.length ?? undefined,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  })

  const searchParams = useSearchParams()
  const { serializeItemId } = useAuthorizedAppItemIdState()

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
          <AuthorizedAppsTableRow
            row={row}
            className="hover:border-border-hover hover:bg-surface-hover"
          />
        </Link>
      )}
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
