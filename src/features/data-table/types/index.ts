/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowData } from "@tanstack/react-table"

export type DataTableColumnClassName = React.ComponentProps<"div">["className"]

export interface DataTableHeaderClassName {
  getClassName: () => DataTableColumnClassName
}

export interface DataTableCellClassName {
  getClassName: () => DataTableColumnClassName
}

export interface DataTableColumnMeta<TData extends RowData, TValue> {
  headerClassName?: DataTableColumnClassName
  cellClassName?: DataTableColumnClassName
}

declare module "@tanstack/react-table" {
  interface Cell<TData extends RowData, TValue>
    extends DataTableHeaderClassName {}

  interface Header<TData extends RowData, TValue>
    extends DataTableCellClassName {}

  interface ColumnMeta<TData extends RowData, TValue>
    extends DataTableColumnMeta<TData, TValue> {}
}
