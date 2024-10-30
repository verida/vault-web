import { createColumnHelper } from "@tanstack/react-table"
import { intlFormat, isDate } from "date-fns"
import Link from "next/link"
import { useMemo } from "react"

import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { DataConnectionLogLevelBadge } from "@/components/data-connections/data-connection-log-level-badge"
import { Typography } from "@/components/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataConnection } from "@/features/data-connections/hooks/use-data-connection"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { DataConnectionSyncLog } from "@/features/data-connections/types"
import { buildConnectionId } from "@/features/data-connections/utils"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { VeridaRecord } from "@/features/verida-database/types"
import { SHORT_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

const columnHelper = createColumnHelper<VeridaRecord<DataConnectionSyncLog>>()

export const dataConnectionLogsTableColumns = [
  columnHelper.accessor((row) => row.accountId, {
    id: "connection",
    meta: {
      headerClassName: "w-52 shrink-0",
    },
    header: "Connection",
    cell: (context) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { provider, isLoading: isLoadingProvider } = useDataProvider(
        context.row.original.providerId
      )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { connection, isLoading: isConnectionLoading } = useDataConnection(
        buildConnectionId({
          providerId: context.row.original.providerId,
          accountId: context.row.original.accountId,
        })
      )

      return (
        <div className="flex w-full flex-col gap-3">
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
      )
    },
  }),
  columnHelper.accessor((row) => row.level, {
    id: "level",
    header: "Level",
    cell: (context) => (
      <DataConnectionLogLevelBadge level={context.getValue()} />
    ),
  }),
  columnHelper.accessor((row) => row.handlerId, {
    id: "handler",
    header: "Handler",
    cell: (context) => {
      const handlerId = context.getValue()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { provider, isLoading: isLoadingProvider } = useDataProvider(
        context.row.original.providerId
      )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const handlerDefinition = useMemo(() => {
        return provider?.handlers?.find((handler) => handler.id === handlerId)
      }, [provider?.handlers, handlerId])

      if (provider) {
        return (
          <Typography variant="base-semibold">
            {handlerDefinition?.label || provider.label}
          </Typography>
        )
      }

      if (isLoadingProvider) {
        return <Skeleton className="my-0.5 h-3.5 w-24" />
      }

      return null
    },
  }),
  columnHelper.accessor((row) => row.message, {
    id: "message",
    meta: {
      headerClassName: "flex-1",
    },
    header: "Message",
    cell: (context) => (
      <Typography variant="base-regular" className="line-clamp-6">
        {context.renderValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor((row) => row.insertedAt, {
    id: "timestamp",
    meta: {
      headerClassName: "w-44 shrink-0",
      align: "right",
    },
    header: "Timestamp",
    cell: (context) => {
      const value = context.getValue()
      const date = new Date(value || "")
      if (!isDate(date)) {
        return (
          <div className="text-muted-foreground">
            <Typography variant="base-regular" className="truncate">
              {EMPTY_VALUE_FALLBACK}
            </Typography>
          </div>
        )
      }

      const formattedDate = intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
      return (
        <div className="text-muted-foreground">
          <Typography variant="base-regular" className="truncate">
            {formattedDate}
          </Typography>
        </div>
      )
    },
  }),
]
