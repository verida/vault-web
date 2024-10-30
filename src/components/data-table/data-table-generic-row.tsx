import { Row, flexRender } from "@tanstack/react-table"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { cn } from "@/styles/utils"

export type DataTableGenericRowProps<TData> = {
  row: Row<TData>
} & Omit<React.ComponentProps<typeof DataTableBaseRow>, "children">

export function DataTableGenericRow<TData>(
  props: DataTableGenericRowProps<TData>
) {
  const { row, ...cardProps } = props

  return (
    <DataTableBaseRow {...cardProps}>
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          className={cn("flex flex-col gap-2", cell.getClassName())}
        >
          {typeof cell.column.columnDef.header === "string" ? (
            <div className="sm:hidden">
              {cell.getIsPlaceholder() ? null : (
                <DataTableColumnHeader align={cell.getAlign()}>
                  {cell.column.columnDef.header}
                </DataTableColumnHeader>
              )}
            </div>
          ) : null}
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </DataTableBaseRow>
  )
}
DataTableGenericRow.displayName = "DataTableGenericRow"
