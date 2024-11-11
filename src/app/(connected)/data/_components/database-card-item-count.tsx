"use client"

import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"
import { cn } from "@/styles/utils"

export type DatabaseCardItemCountProps = {
  databaseVaultName: string
} & React.ComponentProps<"div">

export function DatabaseCardItemCount(props: DatabaseCardItemCountProps) {
  const { databaseVaultName, className, ...divProps } = props

  const { pagination, isLoading } = useVeridaDataRecords({
    databaseName: databaseVaultName,
  })

  return (
    <div className={cn("text-muted-foreground", className)} {...divProps}>
      {pagination?.unfilteredTotalRecordsCount !== undefined &&
      pagination.unfilteredTotalRecordsCount !== null ? (
        <Typography variant="base-l" className="leading-6">
          {`${pagination.unfilteredTotalRecordsCount} items`}
        </Typography>
      ) : isLoading ? (
        <Skeleton className="my-1 h-4 w-28" />
      ) : (
        <Typography variant="base-l" className="leading-6">
          - items
        </Typography>
      )}
    </div>
  )
}
DatabaseCardItemCount.displayName = "DatabaseCardItemCount"
