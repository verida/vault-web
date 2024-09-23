"use client"

import Link from "next/link"

import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DataConnection, useDataProvider } from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type DataConnectionCardProps = {
  connection: DataConnection
} & React.ComponentProps<typeof Card>

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, className, ...cardProps } = props

  const { provider } = useDataProvider(connection.providerId)

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <DataConnectionAvatar connection={connection} provider={provider} />
          <Button size="lg" variant="outline" asChild>
            <Link
              href={getConnectionPageRoute({
                connectionId: connection._id,
              })}
            >
              Details
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {provider?.label ? (
            <Typography variant="heading-4">{provider.label}</Typography>
          ) : (
            <Skeleton className="h-6 w-32" />
          )}
          <Typography variant="base-regular">
            {connection.profile.readableId}
          </Typography>
        </div>
      </div>
    </Card>
  )
}
DataConnectionCard.displayName = "DataConnectionCard"

export type DataConnectionSkeletonCardProps = React.ComponentProps<typeof Card>

export function DataConnectionSkeletonCard(
  props: DataConnectionSkeletonCardProps
) {
  const { className, ...cardProps } = props

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <Skeleton className="size-12 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="my-1 h-4 w-1/3 sm:h-5" />
          <Skeleton className="my-1 h-3.5 w-2/3" />
        </div>
      </div>
    </Card>
  )
}
DataConnectionSkeletonCard.displayName = "DataConnectionSkeletonCard"
