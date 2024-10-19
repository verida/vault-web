import { DatabaseCardItemCount } from "@/app/(connected)/data/_components/database-card-item-count"
import { DatabaseIcon } from "@/components/icons/database-icon"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { DatabaseDefinition } from "@/features/data/types"
import { cn } from "@/styles/utils"

export type DatabaseCardProps = {
  databaseDefinition: DatabaseDefinition
} & React.ComponentProps<typeof Card>

export function DatabaseCard(props: DatabaseCardProps) {
  const { databaseDefinition, className, ...cardProps } = props

  return (
    <Card
      className={cn(
        "rounded-2xl hover:border-border-hover hover:bg-surface-hover",
        className
      )}
      {...cardProps}
    >
      <CardContent className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:px-6">
        <DatabaseIcon fill={databaseDefinition.color} />
        <div className="flex flex-col gap-1">
          <Typography variant="heading-4">
            {databaseDefinition.titlePlural}
          </Typography>
          <DatabaseCardItemCount
            databaseVaultName={databaseDefinition.databaseVaultName}
          />
        </div>
      </CardContent>
    </Card>
  )
}
DatabaseCard.displayName = "DatabaseCard"
