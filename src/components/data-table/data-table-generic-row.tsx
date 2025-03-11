import { Row, flexRender } from "@tanstack/react-table"
import { ComponentProps } from "react"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { cn } from "@/styles/utils"

export interface DataTableGenericRowProps<TData>
  extends Omit<ComponentProps<typeof DataTableBaseRow>, "children"> {
  row: Row<TData>
}

export function DataTableGenericRow<TData>(
  props: DataTableGenericRowProps<TData>
) {
  const { row, className, ...cardProps } = props

  return (
    <DataTableBaseRow
      className={cn(
        "flex flex-col gap-6 md:h-20 md:flex-row md:items-center md:justify-between",
        className
      )}
      {...cardProps}
    >
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          className={cn("flex flex-col gap-2", cell.getClassName())}
        >
          {typeof cell.column.columnDef.header === "string" ? (
            <div className="md:hidden">
              {cell.getIsPlaceholder() ? null : (
                <DataTableColumnHeader>
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
