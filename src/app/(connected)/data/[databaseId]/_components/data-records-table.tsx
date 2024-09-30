"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"
import { useMemo } from "react"

import { getDataRecordsTableColumns } from "@/app/(connected)/data/[databaseId]/_components/data-records-table-columns"
import { DataTableGenericRow } from "@/components/data-table/data-table-generic-row"
import { DataTableHeader } from "@/components/data-table/data-table-header"
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
import { DatabaseDefinition } from "@/features/data"
import { DataTableColumnAlignFeature } from "@/features/data-table/data-table-column-align-feature"
import { DataTableColumnClassNameFeature } from "@/features/data-table/data-table-column-classname-feature"
import { VeridaRecord, useVeridaDataRecords } from "@/features/verida-database"

const fallbackData: VeridaRecord[] = []

const getRowId = (record: VeridaRecord) => record._id

export type DataRecordsTableProps = {
  databaseDefinition: DatabaseDefinition
}

export function DataRecordsTable(props: DataRecordsTableProps) {
  const { databaseDefinition } = props

  const { records, isLoading, isError } = useVeridaDataRecords({
    databaseName: databaseDefinition.databaseVaultName,
  })

  const columns = useMemo(() => getDataRecordsTableColumns(), [])

  const table = useReactTable({
    data: records ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: columns,
    _features: [DataTableColumnAlignFeature, DataTableColumnClassNameFeature],
    getRowId,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-1 flex-col gap-0">
      <div className="hidden sm:block">
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
              <Link href={`?id=${row.original._id}`} className="rounded-lg">
                <DataTableGenericRow
                  row={row}
                  className="hover:border-border-hover hover:bg-surface-hover"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1">
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
    </div>
  )
}
DataRecordsTable.displayName = "DataRecordsTable"
