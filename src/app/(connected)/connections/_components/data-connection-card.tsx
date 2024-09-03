import Link from "next/link"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DataConnection } from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type DataConnectionCardProps = {
  connection: DataConnection
} & React.ComponentProps<typeof Card>

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, className, ...cardProps } = props

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          {connection.icon ? (
            // <Image
            //   src={iconUrl}
            //   alt={label}
            //   width={48}
            //   height={48}
            //   className="size-12 rounded-full border"
            // />
            /* eslint-disable @next/next/no-img-element */
            <img
              src={connection.icon}
              alt={connection.label}
              width={48}
              height={48}
              className="size-12 rounded-full border"
            />
          ) : null}

          <Button size="lg" variant="outline" asChild>
            <Link
              href={getConnectionPageRoute({
                connectionId: connection.name,
              })}
            >
              Details
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="heading-4">{connection.label}</Typography>
          <Typography variant="base-regular">{connection.userId}</Typography>
        </div>
      </div>
    </Card>
  )
}
DataConnectionCard.displayName = "DataConnectionCard"
