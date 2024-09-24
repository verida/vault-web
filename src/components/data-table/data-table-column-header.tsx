import { Column } from "@tanstack/react-table"
import React from "react"

import { cn } from "@/styles/utils"

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue> // Not used yet but will be when sorting is implemented
  title: string
  align?: "left" | "center" | "right"
} & React.ComponentProps<"div">

export function DataTableColumnHeader<TData, TValue>(
  props: DataTableColumnHeaderProps<TData, TValue>
) {
  const { title, align = "left", className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex w-full flex-row",
        align === "right"
          ? "justify-end"
          : align === "center"
            ? "justify-center"
            : "justify-start",
        className
      )}
      {...divProps}
    >
      <span>{title}</span>
    </div>
  )
}
DataTableColumnHeader.displayName = "DataTableColumnHeader"
