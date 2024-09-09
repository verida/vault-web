"use client"

import { DatabaseIcon } from "@/components/icons/database-icon"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DatabaseDefinition } from "@/features/data"
import { useData } from "@/features/data/hooks"
import { cn } from "@/styles/utils"

export type DatabaseCardProps = {
  databaseDefinition: DatabaseDefinition
} & React.ComponentProps<typeof Card>

export function DatabaseCard(props: DatabaseCardProps) {
  const { databaseDefinition, className, ...cardProps } = props

  const { dataItemsCount, isDataItemsCountPending } = useData(
    databaseDefinition.databaseVaultName
  )

  return (
    <Card className={cn("rounded-2xl shadow-card", className)} {...cardProps}>
      <CardContent className="p-6">
        <DatabaseIcon fill={databaseDefinition.color} />
        <Typography variant="heading-4" className="mt-6">
          {databaseDefinition.titlePlural}
        </Typography>
        {isDataItemsCountPending ? (
          <Skeleton className="h-[23px] w-20" />
        ) : (
          <Typography
            variant="base-l"
            className="mt-1 h-[23px] text-muted-foreground"
          >
            {dataItemsCount} items
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
DatabaseCard.displayName = "DatabaseCard"
