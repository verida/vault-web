"use client"

import { Row, flexRender } from "@tanstack/react-table"
import React, { useMemo } from "react"

import { DataTableBaseRow } from "@/components/data-table/data-table-base-row"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export type DataConnectionLogsTableRowProps = {
  row: Row<DataConnectionSyncLog>
  hideConnectionColumn?: boolean
} & Omit<React.ComponentProps<typeof DataTableBaseRow>, "children">

export function DataConnectionLogsTableRow(
  props: DataConnectionLogsTableRowProps
) {
  const { row, hideConnectionColumn = false, className, ...cardProps } = props

  const connectionCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "connection")
  }, [row])

  const levelCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "level")
  }, [row])

  const handlerCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "handler")
  }, [row])

  const messageCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "message")
  }, [row])

  const timestampCell = useMemo(() => {
    return row.getAllCells().find((cell) => cell.column.id === "timestamp")
  }, [row])

  return (
    <DataTableBaseRow
      className={cn(
        "flex flex-col items-start gap-6 sm:h-auto sm:flex-col sm:items-start sm:justify-start sm:gap-6 md:flex-row md:gap-8",
        className
      )}
      {...cardProps}
    >
      {!hideConnectionColumn ? (
        <div className="md:w-52">
          {connectionCell
            ? flexRender(
                connectionCell.column.columnDef.cell,
                connectionCell.getContext()
              )
            : null}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          {levelCell
            ? flexRender(
                levelCell.column.columnDef.cell,
                levelCell.getContext()
              )
            : null}
          {handlerCell
            ? flexRender(
                handlerCell.column.columnDef.cell,
                handlerCell.getContext()
              )
            : null}
        </div>
        {messageCell
          ? flexRender(
              messageCell.column.columnDef.cell,
              messageCell.getContext()
            )
          : null}
      </div>
      <div className="text-right md:w-44">
        {timestampCell
          ? flexRender(
              timestampCell.column.columnDef.cell,
              timestampCell.getContext()
            )
          : null}
      </div>
    </DataTableBaseRow>
  )
}
DataConnectionLogsTableRow.displayName = "DataConnectionLogsTableRow"
