import { Row, flexRender } from "@tanstack/react-table"
import { useMemo } from "react"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { cn } from "@/styles/utils"

export interface AuthorizedAppsTableRowProps
  extends Omit<React.ComponentProps<typeof DataTableBaseRow>, "children"> {
  row: Row<AuthorizedAppRecord>
}

export function AuthorizedAppsTableRow(props: AuthorizedAppsTableRowProps) {
  const { row, className, ...cardProps } = props

  const nameCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "name")
  }, [row])

  const urlCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "url")
  }, [row])

  const scopesCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "scopes")
  }, [row])

  const lastAccessedAtCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "lastAccessedAt")
  }, [row])

  return (
    <DataTableBaseRow
      className={cn("flex flex-col gap-6 md:flex-row", className)}
      {...cardProps}
    >
      <div className="flex shrink-0 flex-col gap-1 md:w-64">
        <div>
          {nameCell
            ? flexRender(nameCell.column.columnDef.cell, nameCell.getContext())
            : null}
        </div>
        <div>
          {urlCell
            ? flexRender(urlCell.column.columnDef.cell, urlCell.getContext())
            : null}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {typeof scopesCell?.column.columnDef.header === "string" ? (
          <div className="md:hidden">
            {scopesCell.getIsPlaceholder() ? null : (
              <DataTableColumnHeader>
                {scopesCell.column.columnDef.header}
              </DataTableColumnHeader>
            )}
          </div>
        ) : null}
        {scopesCell
          ? flexRender(
              scopesCell.column.columnDef.cell,
              scopesCell.getContext()
            )
          : null}
      </div>
      <div className="shrink-0 md:w-44 md:self-center md:text-right">
        {typeof lastAccessedAtCell?.column.columnDef.header === "string" ? (
          <div className="md:hidden">
            {lastAccessedAtCell.getIsPlaceholder() ? null : (
              <DataTableColumnHeader>
                {lastAccessedAtCell.column.columnDef.header}
              </DataTableColumnHeader>
            )}
          </div>
        ) : null}
        {lastAccessedAtCell
          ? flexRender(
              lastAccessedAtCell.column.columnDef.cell,
              lastAccessedAtCell.getContext()
            )
          : null}
      </div>
    </DataTableBaseRow>
  )
}
AuthorizedAppsTableRow.displayName = "AuthorizedAppsTableRow"
