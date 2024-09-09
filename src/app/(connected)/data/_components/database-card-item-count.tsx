"use client"

import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { useData } from "@/features/data"
import { cn } from "@/styles/utils"

export type DatabaseCardItemCountProps = {
  databaseVaultName: string
} & React.ComponentProps<"div">

export function DatabaseCardItemCount(props: DatabaseCardItemCountProps) {
  const { databaseVaultName, className, ...divProps } = props

  const { dataItemsCount, isDataItemsCountPending } = useData(databaseVaultName)

  return (
    <div className={cn("text-muted-foreground", className)} {...divProps}>
      {dataItemsCount !== undefined ? (
        <Typography variant="base-l" className="leading-6">
          {`${dataItemsCount} items`}
        </Typography>
      ) : isDataItemsCountPending ? (
        <Skeleton className="my-1 h-4 w-28" />
      ) : (
        <Typography variant="base-l" className="leading-6">
          Unknown items
        </Typography>
      )}
    </div>
  )
}
DatabaseCardItemCount.displayName = "DatabaseCardItemCount"
