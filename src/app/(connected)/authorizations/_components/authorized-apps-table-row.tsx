import { Row } from "@tanstack/react-table"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { cn } from "@/styles/utils"

export type AuthorizedAppsTableRowProps = {
  row: Row<AuthorizedAppRecord>
} & Omit<React.ComponentProps<typeof DataTableBaseRow>, "children">

export function AuthorizedAppsTableRow(props: AuthorizedAppsTableRowProps) {
  const { row, className, ...cardProps } = props

  return (
    <DataTableBaseRow
      className={cn("flex flex-col gap-6 md:flex-row", className)}
      {...cardProps}
    >
      <div>{row.original.name}</div>
    </DataTableBaseRow>
  )
}
