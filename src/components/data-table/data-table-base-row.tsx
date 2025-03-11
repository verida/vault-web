import { type ComponentProps } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/styles/utils"

export type DataTableBaseRowProps = ComponentProps<typeof Card>

export function DataTableBaseRow(props: DataTableBaseRowProps) {
  const { children, className, ...cardProps } = props

  return (
    <Card className={cn("w-full p-5", className)} {...cardProps}>
      {children}
    </Card>
  )
}
DataTableBaseRow.displayName = "DataTableBaseRow"
