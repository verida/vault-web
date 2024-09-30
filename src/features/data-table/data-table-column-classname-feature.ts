import { ColumnDef, RowData, TableFeature } from "@tanstack/react-table"

export const DataTableColumnClassNameFeature: TableFeature = {
  getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
    return {
      meta: {
        headerClassName: "flex-1",
        cellClassName: "flex-1",
      },
    }
  },
  createHeader: (header): void => {
    header.getClassName = () => {
      return header.column.columnDef.meta?.headerClassName
    }
  },
  createCell: (cell): void => {
    cell.getClassName = () => {
      return cell.column.columnDef.meta?.cellClassName
    }
  },
}
