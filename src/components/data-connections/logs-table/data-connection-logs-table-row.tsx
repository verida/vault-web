"use client"

import { intlFormat } from "date-fns"
import Link from "next/link"
import React, { useMemo } from "react"

import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { DataConnectionLogLevelBadge } from "@/components/data-connections/data-connection-log-level-badge"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDataConnection } from "@/features/data-connections/hooks/use-data-connection"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { buildConnectionId } from "@/features/data-connections/utils"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type DataConnectionLogsTableRowProps = {
  log: DataConnectionSyncLog
  hideConnectionColumn?: boolean
} & React.ComponentProps<typeof Card>

export function DataConnectionLogsTableRow(
  props: DataConnectionLogsTableRowProps
) {
  const { log, hideConnectionColumn = false, className, ...cardProps } = props

  const { provider, isLoading: isLoadingProvider } = useDataProvider(
    log.providerId
  )

  const { connection, isLoading: isConnectionLoading } = useDataConnection(
    buildConnectionId({
      providerId: log.providerId,
      accountId: log.accountId,
    })
  )

  const handlerDefinition = useMemo(() => {
    return provider?.handlers?.find((handler) => handler.id === log.handlerId)
  }, [provider?.handlers, log.handlerId])

  return (
    <Card
      className={cn(
        "flex flex-col items-start gap-6 px-4 py-4 md:flex-row md:gap-8 md:px-8 md:py-6",
        className
      )}
      {...cardProps}
    >
      {!hideConnectionColumn ? (
        <div className="flex w-full flex-col gap-3 md:w-52">
          <DataConnectionAvatar
            connection={connection}
            isConnectionLoading={isConnectionLoading}
            provider={provider}
            isProviderLoading={isLoadingProvider}
          />
          {connection ? (
            <Link
              href={getConnectionPageRoute({ connectionId: connection._id })}
              className="text-muted-foreground hover:underline"
            >
              <Typography variant="base-semibold" className="truncate">
                {connection.profile.readableId}
              </Typography>
            </Link>
          ) : isConnectionLoading ? (
            <Skeleton className="my-0.5 h-3.5 w-40" />
          ) : (
            <Typography variant="base-regular" className="truncate italic">
              {`Connection not found`}
            </Typography>
          )}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <DataConnectionLogLevelBadge level={log.level} />
          {provider ? (
            <Typography variant="base-semibold">
              {log.handlerId ? handlerDefinition?.label : provider.label}
            </Typography>
          ) : (
            <Skeleton className="my-0.5 h-3.5 w-24" />
          )}
        </div>
        <Typography variant="base-regular" className="line-clamp-6">
          {log.message}
        </Typography>
      </div>
      <div className="w-full text-left text-muted-foreground md:w-44 md:text-right">
        <Typography variant="base-regular">
          {intlFormat(new Date(log.insertedAt), LONG_DATE_TIME_FORMAT_OPTIONS)}
        </Typography>
      </div>
    </Card>
  )
}
DataConnectionLogsTableRow.displayName = "DataConnectionLogsTableRow"
