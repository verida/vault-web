import React from "react"

import { DataTableColumnAlign } from "@/features/data-table/types"
import { cn } from "@/styles/utils"

export interface DataTableColumnHeaderProps
  extends React.ComponentProps<"div"> {
  align?: DataTableColumnAlign
}

export function DataTableColumnHeader(props: DataTableColumnHeaderProps) {
  const { align = "left", children, className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex w-full flex-row text-xs font-semibold leading-normal text-muted-foreground",
        align === "right"
          ? "justify-end"
          : align === "center"
            ? "justify-center"
            : "justify-start",
        className
      )}
      {...divProps}
    >
      <span>{children}</span>
    </div>
  )
}
DataTableColumnHeader.displayName = "DataTableColumnHeader"
