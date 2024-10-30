import { Card } from "@/components/ui/card"
import { cn } from "@/styles/utils"

export type DataTableBaseRowProps = React.ComponentProps<typeof Card>

export function DataTableBaseRow(props: DataTableBaseRowProps) {
  const { children, className, ...cardProps } = props

  return (
    <Card
      className={cn(
        "flex w-full flex-col gap-4 px-4 py-4 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:gap-8",
        className
      )}
      {...cardProps}
    >
      {children}
    </Card>
  )
}
DataTableBaseRow.displayName = "DataTableBaseRow"
