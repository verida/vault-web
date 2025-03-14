import {
  type ColumnDef,
  type RowData,
  type TableFeature,
} from "@tanstack/react-table"

import type { DataTableColumnAlign } from "@/features/data-table/types"

export const DATA_TABLE_COLUMN_ALIGN_DEFAULT: DataTableColumnAlign = "left"

export const DataTableColumnAlignFeature: TableFeature = {
  getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
    return {
      meta: {
        align: DATA_TABLE_COLUMN_ALIGN_DEFAULT,
      },
    }
  },
  createHeader: (header): void => {
    header.getAlign = () => {
      return (
        header.column.columnDef.meta?.align ?? DATA_TABLE_COLUMN_ALIGN_DEFAULT
      )
    }
  },
  createCell: (cell): void => {
    cell.getAlign = () => {
      return (
        cell.column.columnDef.meta?.align ?? DATA_TABLE_COLUMN_ALIGN_DEFAULT
      )
    }
  },
}
