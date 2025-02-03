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
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { DATA_TABLE_PAGINATION_SIZES } from "@/features/data-table/constants"
import { DataTablePaginationSizeValue } from "@/features/data-table/types"

export interface DataTablePaginationProps<TData>
  extends Omit<React.ComponentProps<"footer">, "children"> {
  table: Table<TData>
  paginationSizes?: DataTablePaginationSizeValue[]
}

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
            value={`${table.getState().pagination.pageSize || EMPTY_VALUE_FALLBACK}`}
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
                // FIXME: when the pagination is controlled, pageCount can be
                // unknown during page changes, try to find a way to avoid this
                // as it displays the fallback value
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
