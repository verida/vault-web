import { ColumnDef, RowData, TableFeature } from "@tanstack/react-table"

import { DataTableColumnClassName } from "@/features/data-table/types"

export const DATA_TABLE_COLUMN_CLASSNAME_DEFAULT: DataTableColumnClassName =
  "flex-1"

export const DataTableColumnClassNameFeature: TableFeature = {
  getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
    return {
      meta: {
        headerClassName: DATA_TABLE_COLUMN_CLASSNAME_DEFAULT,
        cellClassName: DATA_TABLE_COLUMN_CLASSNAME_DEFAULT,
      },
    }
  },
  createHeader: (header): void => {
    header.getClassName = () => {
      return (
        header.column.columnDef.meta?.headerClassName ??
        DATA_TABLE_COLUMN_CLASSNAME_DEFAULT
      )
    }
  },
  createCell: (cell): void => {
    cell.getClassName = () => {
      return (
        cell.column.columnDef.meta?.cellClassName ??
        DATA_TABLE_COLUMN_CLASSNAME_DEFAULT
      )
    }
  },
}
