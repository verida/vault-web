import { ComponentProps } from "react"

import { DatabaseCardItemCount } from "@/app/(connected)/data/_components/database-card-item-count"
import { DatabaseIcon } from "@/components/icons/database-icon"
import { Card, CardBody } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import { DatabaseDefinition } from "@/features/data/types"
import { cn } from "@/styles/utils"

export interface DatabaseCardProps extends ComponentProps<typeof Card> {
  databaseDefinition: DatabaseDefinition
}

export function DatabaseCard(props: DatabaseCardProps) {
  const { databaseDefinition, className, ...cardProps } = props

  return (
    <Card
      className={cn(
        "rounded-2xl px-4 hover:border-border-hover hover:bg-surface-hover md:px-6",
        className
      )}
      {...cardProps}
    >
      <CardBody className="flex flex-col gap-4 md:gap-6">
        <DatabaseIcon fill={databaseDefinition.color} />
        <div className="flex flex-col gap-1">
          <Typography variant="heading-4">
            {databaseDefinition.titlePlural}
          </Typography>
          <DatabaseCardItemCount
            databaseVaultName={databaseDefinition.databaseVaultName}
          />
        </div>
      </CardBody>
    </Card>
  )
}
DatabaseCard.displayName = "DatabaseCard"
