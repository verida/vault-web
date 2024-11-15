"use client"

import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useMemo, useState } from "react"

import { getDataRecordsTableColumns } from "@/app/(connected)/data/[databaseId]/_components/data-records-table-columns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableGenericRow } from "@/components/data-table/data-table-generic-row"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { DATA_TABLE_PAGINATION_SIZE_DEFAULT } from "@/features/data-table/constants"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { DatabaseDefinition } from "@/features/data/types"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"
import { VeridaRecord } from "@/features/verida-database/types"

const fallbackData: VeridaRecord[] = []

const getRowId = (record: VeridaRecord) => record._id

export type DataRecordsTableProps = {
  databaseDefinition: DatabaseDefinition
} & Pick<React.ComponentProps<typeof DataTable>, "className">

export function DataRecordsTable(props: DataRecordsTableProps) {
  const { databaseDefinition, className } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DATA_TABLE_PAGINATION_SIZE_DEFAULT,
  })

  const {
    records,
    pagination: recordsPaginationInfo,
    isLoading,
    isError,
    isFetching,
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
    <DataTable
      table={table}
      rowComponent={(row) => (
        <Link
          href={`?itemId=${encodeURIComponent(row.original._id)}`}
          className="rounded-lg"
        >
          <DataTableGenericRow
            row={row}
            className="hover:border-border-hover hover:bg-surface-hover"
          />
        </Link>
      )}
      className={className}
      isLoading={isLoading}
      isRefreshing={isFetching}
      isError={isError}
      loadingTitle={`Loading ${databaseDefinition.titlePlural}...`}
      loadingDescription="Please wait while we load your data."
      errorTitle="Error"
      errorDescription={`There was an error getting your ${databaseDefinition.titlePlural}. Please try again later.`}
      emptyStateTitle={`No ${databaseDefinition.titlePlural}`}
      emptyStateDescription={`You have no ${databaseDefinition.titlePlural} stored in your Vault yet.`}
    />
  )
}
DataRecordsTable.displayName = "DataRecordsTable"
