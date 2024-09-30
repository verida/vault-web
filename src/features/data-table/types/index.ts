/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowData } from "@tanstack/react-table"

export type DataTableColumnAlign = "left" | "center" | "right"

export type DataTableColumnClassName = React.ComponentProps<"div">["className"]

export interface DataTableExtendedHeader {
  getAlign: () => DataTableColumnAlign
  getClassName: () => DataTableColumnClassName
}

export interface DataTableExtendedCell {
  getAlign: () => DataTableColumnAlign
  getClassName: () => DataTableColumnClassName
}

export interface DataTableColumnMeta<TData extends RowData, TValue> {
  align?: DataTableColumnAlign
  headerClassName?: DataTableColumnClassName
  cellClassName?: DataTableColumnClassName
}

declare module "@tanstack/react-table" {
  interface Cell<TData extends RowData, TValue>
    extends DataTableExtendedHeader {}

  interface Header<TData extends RowData, TValue>
    extends DataTableExtendedCell {}

  interface ColumnMeta<TData extends RowData, TValue>
    extends DataTableColumnMeta<TData, TValue> {}
}
