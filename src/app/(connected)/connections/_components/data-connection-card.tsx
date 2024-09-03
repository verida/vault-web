import Link from "next/link"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DataConnection } from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"

export type DataConnectionCardProps = {
  connection: DataConnection
}

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection } = props

  return (
    <div className="flex h-full cursor-pointer flex-col">
      <Card className="flex-grow">
        <CardHeader className="flex flex-row justify-between pb-0">
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

          <Button size="lg" variant="outline" className="!mt-0 px-4" asChild>
            <Link
              href={getConnectionPageRoute({
                connectionId: connection.name,
              })}
            >
              Details
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Typography variant="heading-4" className="mb-2 mt-6">
            {connection.label}
          </Typography>
          {connection.userId && (
            <Typography className="mb-4">{connection.userId}</Typography>
          )}
          {connection.description && (
            <Typography variant="base-l" className="text-muted-foreground">
              {connection.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
DataConnectionCard.displayName = "DataConnectionCard"
