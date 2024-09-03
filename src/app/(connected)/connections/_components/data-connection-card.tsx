"use client"

import { useRouter } from "next/navigation"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DataConnection } from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"

export type DataConnectionCardProps = {
  onDisconnect?: () => void
  connection: DataConnection
}

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, onDisconnect } = props

  const router = useRouter()

  const handleClickConnection = () => {
    router.push(
      getConnectionPageRoute({
        connectionId: connection.name,
      })
    )
  }

  return (
    <div
      className="flex h-full cursor-pointer flex-col"
      onClick={handleClickConnection}
    >
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
          <Button
            size="lg"
            variant="outline"
            className="!mt-0 px-4 text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDisconnect?.()
            }}
          >
            Disconnect
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
