"use client"

import { intlFormat, isDate } from "date-fns"
import Link from "next/link"
import { useMemo } from "react"

import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { DataConnection } from "@/features/data-connections/types"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type DataConnectionCardProps = {
  connection: DataConnection
} & React.ComponentProps<typeof Card>

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, className, ...cardProps } = props

  const { provider } = useDataProvider(connection.providerId)

  const latestSyncEnd: Date | undefined = useMemo(() => {
    return connection.handlers.reduce((latest: Date | undefined, handler) => {
      if (!handler.latestSyncEnd) {
        return latest
      }

      const latestSyncEndDate = new Date(handler.latestSyncEnd)
      if (!isDate(latestSyncEndDate)) {
        return latest
      }

      if (!latest) {
        return latestSyncEndDate
      }

      return latestSyncEndDate.getTime() > new Date(latest).getTime()
        ? latestSyncEndDate
        : latest
    }, undefined)
  }, [connection.handlers])

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
        <div className="flex flex-col gap-3 sm:gap-4">
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
          <Separator />
          <div className="flex flex-row items-center justify-between gap-2">
            {connection.syncStatus === "connected" ? (
              <>
                <div className="flex flex-row items-center gap-1 text-muted-foreground">
                  <Typography
                    variant="base-regular"
                    // HACK: Set line-height on both "Last synced" and "Status" label to ensure constant height of the row
                    className="leading-7"
                  >
                    Last synced
                  </Typography>
                </div>
                <Typography variant="base-s-semibold">
                  {latestSyncEnd
                    ? intlFormat(latestSyncEnd, LONG_DATE_TIME_FORMAT_OPTIONS)
                    : "-"}
                </Typography>
              </>
            ) : (
              <>
                <div className="text-muted-foreground">
                  <Typography variant="base-regular" className="leading-7">
                    Status
                  </Typography>
                </div>
                <DataConnectionStatusBadge status={connection.syncStatus} />
              </>
            )}
          </div>
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
