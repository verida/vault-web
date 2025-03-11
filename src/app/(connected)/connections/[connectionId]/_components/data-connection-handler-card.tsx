import { intlFormat, isDate } from "date-fns"
import { type ComponentProps } from "react"

import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import type {
  DataConnectionHandler,
  DataProviderHandler,
} from "@/features/data-connections/types"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export interface DataConnectionHandlerCardProps
  extends Omit<ComponentProps<typeof Card>, "children"> {
  handlerDefinition?: DataProviderHandler
  connectionHandler?: DataConnectionHandler
}

export function DataConnectionHandlerCard(
  props: DataConnectionHandlerCardProps
) {
  const { handlerDefinition, connectionHandler, className, ...cardProps } =
    props

  return (
    <Card
      className={cn("gap-4 rounded-2xl px-4 md:px-6", className)}
      {...cardProps}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle variant="heading-5">{handlerDefinition?.label}</CardTitle>
        </div>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Status</Typography>
          </div>
          <DataConnectionStatusBadge
            status={connectionHandler?.status || "disabled"}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="shrink-0 text-muted-foreground">
            <Typography variant="base-regular">Last synced</Typography>
          </div>
          <Typography variant="base-regular" className="flex-1 text-end">
            {connectionHandler?.enabled &&
            connectionHandler?.latestSyncEnd &&
            isDate(new Date(connectionHandler.latestSyncEnd))
              ? intlFormat(
                  new Date(connectionHandler.latestSyncEnd),
                  LONG_DATE_TIME_FORMAT_OPTIONS
                )
              : EMPTY_VALUE_FALLBACK}
          </Typography>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="shrink-0 text-muted-foreground">
            <Typography variant="base-regular">Sync summary</Typography>
          </div>
          <Typography
            className="line-clamp-4 flex-1 text-end"
            variant="base-regular"
          >
            {connectionHandler?.syncMessage || EMPTY_VALUE_FALLBACK}
          </Typography>
        </div>
        {handlerDefinition?.options?.map((option) => (
          <div
            key={option.id}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="shrink-0 text-muted-foreground">
              <Typography variant="base-regular">{option.label}</Typography>
            </div>
            <Typography className="flex-1 text-end" variant="base-semibold">
              {connectionHandler?.config?.[option.id] || option.defaultValue}
            </Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
DataConnectionHandlerCard.displayName = "DataConnectionHandlerCard"

export interface DataConnectionHandlerCardSkeletonProps
  extends Omit<ComponentProps<typeof Card>, "children"> {}

export function DataConnectionHandlerCardSkeleton(
  props: DataConnectionHandlerCardSkeletonProps
) {
  const { className, ...cardProps } = props

  return (
    <Card
      className={cn("gap-4 rounded-2xl px-4 md:px-6", className)}
      {...cardProps}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
        </div>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
DataConnectionHandlerCardSkeleton.displayName =
  "DataConnectionHandlerCardSkeleton"
