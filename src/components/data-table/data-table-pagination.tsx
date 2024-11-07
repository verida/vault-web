import { Table } from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationCurrent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationSize,
} from "@/components/ui/pagination"
import { DATA_TABLE_PAGINATION_SIZES } from "@/features/data-table/constants"
import { DataTablePaginationSizeValue } from "@/features/data-table/types"

export type DataTablePaginationProps<TData> = {
  table: Table<TData>
  paginationSizes?: DataTablePaginationSizeValue[]
} & Omit<React.ComponentProps<"footer">, "children">

export function DataTablePagination<TData>(
  props: DataTablePaginationProps<TData>
) {
  const {
    table,
    paginationSizes = DATA_TABLE_PAGINATION_SIZES,
    ...divProps
  } = props

  return (
    <footer {...divProps}>
      <div className="relative flex flex-row items-center justify-center gap-2 sm:justify-between">
        <div className="hidden flex-row items-center gap-2 sm:flex">
          <p className="text-sm font-medium text-muted-foreground">Rows</p>
          <PaginationSize
            sizes={paginationSizes}
            value={`${table.getState().pagination.pageSize || "-"}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          />
        </div>
        <Pagination className="flex flex-row items-center gap-2">
          <p className="hidden text-sm font-medium text-muted-foreground sm:block">
            Page
          </p>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationCurrent
                pageIndex={table.getState().pagination.pageIndex + 1}
                pageCount={table.getPageCount()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </footer>
  )
}
DataTablePagination.displayName = "DataTablePagination"
