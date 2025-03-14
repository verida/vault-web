import { type Header, flexRender } from "@tanstack/react-table"
import { type ComponentProps } from "react"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { cn } from "@/styles/utils"

export interface DataTableHeaderProps<TData, TValue>
  extends Omit<ComponentProps<"header">, "children"> {
  columnHeaders: Header<TData, TValue>[]
}

export function DataTableHeader<TData, TValue>(
  props: DataTableHeaderProps<TData, TValue>
) {
  const { columnHeaders, className, ...headerProps } = props

  return (
    <header
      className={cn(
        "flex flex-row items-center justify-between gap-6 px-5 py-3",
        className
      )}
      {...headerProps}
    >
      {columnHeaders.map((header) => {
        return (
          <div key={header.id} className={cn(header.getClassName())}>
            {header.isPlaceholder ? null : (
              <DataTableColumnHeader align={header.getAlign()}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </DataTableColumnHeader>
            )}
          </div>
        )
      })}
    </header>
  )
}
DataTableHeader.displayName = "DataTableHeader"
