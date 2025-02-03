import { Row, Table } from "@tanstack/react-table"

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
import { DataTablePaginationSizeValue } from "@/features/data-table/types"
import { cn } from "@/styles/utils"

export interface DataTableProps<TData>
  extends Omit<React.ComponentProps<"div">, "children"> {
  table: Table<TData>
  rowComponent: (row: Row<TData>) => React.ReactNode
  isLoading?: boolean
  isRefreshing?: boolean
  isError?: boolean
  paginationSizes?: DataTablePaginationSizeValue[]
  loadingTitle?: string
  loadingDescription?: string
  refreshingMessage?: string
  errorImage?: React.ReactNode
  errorTitle?: string
  errorDescription?: string
  emptyStateImage?: React.ReactNode
  emptyStateTitle?: string
  emptyStateDescription?: string
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    table,
    rowComponent,
    className,
    isLoading,
    isRefreshing,
    isError,
    paginationSizes,
    loadingTitle = "Loading...",
    loadingDescription = "Please wait while we load the data.",
    refreshingMessage = "Refreshing...",
    errorImage,
    errorTitle = "Error",
    errorDescription = "There was an error getting the data. Please try again later.",
    emptyStateImage,
    emptyStateTitle = "No data",
    emptyStateDescription = "There is no data to display.",
    ...divProps
  } = props

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
        <ul className="relative flex flex-col gap-3">
          {table.getRowModel().rows.map((row) => (
            <li key={row.id}>{rowComponent(row)}</li>
          ))}
          {isRefreshing ? (
            <div className="absolute inset-0 bg-background/70">
              <div className="flex h-full items-center justify-center">
                <LoadingBlock>
                  <LoadingBlockSpinner className="size-14" />
                  <LoadingBlockDescription>
                    {refreshingMessage}
                  </LoadingBlockDescription>
                </LoadingBlock>
              </div>
            </div>
          ) : null}
        </ul>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          {isLoading ? (
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>{loadingTitle}</LoadingBlockTitle>
              <LoadingBlockDescription>
                {loadingDescription}
              </LoadingBlockDescription>
            </LoadingBlock>
          ) : isError ? (
            <ErrorBlock>
              {errorImage ?? <ErrorBlockImage />}
              <ErrorBlockTitle>{errorTitle}</ErrorBlockTitle>
              <ErrorBlockDescription>{errorDescription}</ErrorBlockDescription>
            </ErrorBlock>
          ) : (
            <EmptyState>
              {emptyStateImage ?? <EmptyStateImage />}
              <EmptyStateTitle>{emptyStateTitle}</EmptyStateTitle>
              <EmptyStateDescription>
                {emptyStateDescription}
              </EmptyStateDescription>
            </EmptyState>
          )}
        </div>
      )}
      <DataTablePagination
        table={table}
        paginationSizes={paginationSizes}
        className="mt-6"
      />
    </div>
  )
}
DataTable.displayName = "DataTable"
