"use client"

import { intlFormat } from "date-fns"
import Link from "next/link"
import { type ComponentProps, useMemo } from "react"

import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipIndicator } from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import type { DataConnection } from "@/features/data-connections/types"
import { getDataConnectionLatestSyncEnd } from "@/features/data-connections/utils"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export interface DataConnectionCardProps
  extends Omit<ComponentProps<typeof Card>, "children"> {
  connection: DataConnection
  hideDetailsLink?: boolean
}

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, hideDetailsLink = false, className, ...cardProps } = props

  const { provider, isLoading: isProviderLoading } = useDataProvider(
    connection.providerId
  )

  const latestSyncEnd = useMemo(() => {
    return getDataConnectionLatestSyncEnd(connection)
  }, [connection])

  return (
    <Card className={className} {...cardProps}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <DataConnectionAvatar connection={connection} provider={provider} />
        {!hideDetailsLink ? (
          <Button size="lg" variant="outline" asChild>
            <Link
              href={getConnectionPageRoute({
                connectionId: connection._id,
              })}
            >
              Details
            </Link>
          </Button>
        ) : null}
      </CardHeader>
      <div className="flex flex-col gap-3 sm:gap-4">
        <CardBody className="flex flex-col gap-2">
          {provider?.label ? (
            <Typography variant="heading-4" component="h5">
              {provider.label}
            </Typography>
          ) : isProviderLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <Typography variant="heading-4" component="h5">
              -
            </Typography>
          )}
          <Typography variant="base-regular">
            {connection.profile.readableId}
          </Typography>
        </CardBody>
        <Separator />
        <CardFooter className="flex flex-row items-center justify-between gap-2">
          {connection.syncStatus === "connected" ? (
            <>
              <div className="text-muted-foreground">
                <Typography
                  variant="base-regular"
                  // HACK: Set line-height on both "Last synced" and "Status" label to ensure constant height of the row
                  className="leading-7"
                >
                  Last synced
                </Typography>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Typography variant="base-s-semibold">
                  {latestSyncEnd
                    ? intlFormat(latestSyncEnd, LONG_DATE_TIME_FORMAT_OPTIONS)
                    : EMPTY_VALUE_FALLBACK}
                </Typography>
                <TooltipIndicator content="Sync runs at most once per hour" />
              </div>
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
        </CardFooter>
      </div>
    </Card>
  )
}
DataConnectionCard.displayName = "DataConnectionCard"

export interface DataConnectionSkeletonCardProps
  extends Omit<ComponentProps<typeof Card>, "children"> {}

export function DataConnectionSkeletonCard(
  props: DataConnectionSkeletonCardProps
) {
  const { className, ...cardProps } = props

  return (
    <Card className={className} {...cardProps}>
      <div className="flex flex-row items-start justify-between gap-4">
        <Skeleton className="size-12 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="my-1 h-4 w-1/3 sm:h-5" />
        <Skeleton className="my-1 h-3.5 w-2/3" />
      </div>
    </Card>
  )
}
DataConnectionSkeletonCard.displayName = "DataConnectionSkeletonCard"
