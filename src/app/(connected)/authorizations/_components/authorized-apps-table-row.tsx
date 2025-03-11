import { Row, flexRender } from "@tanstack/react-table"
import { ComponentProps, useMemo } from "react"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { VeridaAuthToken } from "@/features/verida-auth/types"
import { cn } from "@/styles/utils"

export interface AuthorizedAppsTableRowProps
  extends Omit<ComponentProps<typeof DataTableBaseRow>, "children"> {
  row: Row<VeridaAuthToken>
}

export function AuthorizedAppsTableRow(props: AuthorizedAppsTableRowProps) {
  const { row, className, ...cardProps } = props

  const applicationCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "application")
  }, [row])

  const scopesCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "scopes")
  }, [row])

  return (
    <DataTableBaseRow
      className={cn("flex flex-col gap-6 md:flex-row", className)}
      {...cardProps}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col gap-1",
          applicationCell?.getClassName()
        )}
      >
        <div>
          {applicationCell
            ? flexRender(
                applicationCell.column.columnDef.cell,
                applicationCell.getContext()
              )
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
    </DataTableBaseRow>
  )
}
AuthorizedAppsTableRow.displayName = "AuthorizedAppsTableRow"
