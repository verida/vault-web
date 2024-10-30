"use client"

import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useMemo, useState } from "react"

import { getDataRecordsTableColumns } from "@/app/(connected)/data/[databaseId]/_components/data-records-table-columns"
import { DataTableGenericRow } from "@/components/data-table/data-table-generic-row"
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
import { DATA_TABLE_PAGINATION_SIZE_DEFAULT } from "@/features/data-table/constants"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { DatabaseDefinition } from "@/features/data/types"
import { VeridaRecord } from "@/features/verida-database/types"
import { useVeridaDataRecords } from "@/features/verida-database/use-verida-data-records"
import { cn } from "@/styles/utils"

const fallbackData: VeridaRecord[] = []

const getRowId = (record: VeridaRecord) => record._id

export type DataRecordsTableProps = {
  databaseDefinition: DatabaseDefinition
} & Omit<React.ComponentProps<"div">, "children">

export function DataRecordsTable(props: DataRecordsTableProps) {
  const { databaseDefinition, className, ...divProps } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DATA_TABLE_PAGINATION_SIZE_DEFAULT,
  })

  const {
    records,
    pagination: recordsPaginationInfo,
    isLoading,
    isError,
  } = useVeridaDataRecords({
    databaseName: databaseDefinition.databaseVaultName,
    options: {
      limit: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
    },
  })

  const columns = useMemo(() => getDataRecordsTableColumns(), [])

  const table = useReactTable({
    data: records ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: columns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: recordsPaginationInfo?.unfilteredTotalRecordsCount ?? undefined,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <div className={cn("flex flex-col gap-0", className)} {...divProps}>
      <div className="hidden md:block">
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTableHeader
            key={headerGroup.id}
            columnHeaders={headerGroup.headers}
          />
        ))}
      </div>
      {table.getRowModel().rows?.length ? (
        <ul className="flex flex-col gap-3">
          {table.getRowModel().rows.map((row) => (
            <li key={row.id}>
              <Link href={`?itemId=${row.original._id}`} className="rounded-lg">
                <DataTableGenericRow
                  row={row}
                  className="hover:border-border-hover hover:bg-surface-hover"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          {isLoading ? (
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>
                {`Loading ${databaseDefinition.titlePlural}...`}
              </LoadingBlockTitle>
              <LoadingBlockDescription>
                Please wait while we load your data.
              </LoadingBlockDescription>
            </LoadingBlock>
          ) : isError ? (
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Data Error</ErrorBlockTitle>
              <ErrorBlockDescription>
                {`There was an error getting your ${databaseDefinition.titlePlural}. Please try again later.`}
              </ErrorBlockDescription>
            </ErrorBlock>
          ) : (
            <EmptyState>
              <EmptyStateImage />
              <EmptyStateTitle>
                {`No ${databaseDefinition.titlePlural}`}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {`You have no ${databaseDefinition.titlePlural} stored in your Vault yet.`}
              </EmptyStateDescription>
            </EmptyState>
          )}
        </div>
      )}
      <DataTablePagination table={table} className="mt-6" />
    </div>
  )
}
DataRecordsTable.displayName = "DataRecordsTable"
