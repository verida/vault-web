"use client"

import { intlFormat } from "date-fns"
import { type ComponentProps, useCallback, useMemo, useState } from "react"

import {
  DisconnectDataConnectionDialog,
  DisconnectDataConnectionDialogTrigger,
} from "@/app/(connected)/connections/[connectionId]/_components/disconnect-data-connection-dialog"
import { DataConnectionAvatar } from "@/components/data-connections/data-connection-avatar"
import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TooltipIndicator } from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { useSyncDataConnection } from "@/features/data-connections/hooks/use-sync-data-connection"
import type { DataConnection } from "@/features/data-connections/types"
import { getDataConnectionLatestSyncEnd } from "@/features/data-connections/utils"
import { useToast } from "@/features/toasts/use-toast"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"
import { wait } from "@/utils/misc"

export interface DataConnectionDetailsProps
  extends Omit<ComponentProps<"div">, "children"> {
  connection: DataConnection
}

export function DataConnectionDetails(props: DataConnectionDetailsProps) {
  const { connection, className, ...divProps } = props

  const [isSyncing, setIsSyncing] = useState(false)

  const { toast } = useToast()

  const { provider } = useDataProvider(connection.providerId)
  const { syncDataConnection } = useSyncDataConnection()

  const handleSyncClick = useCallback(async () => {
    setIsSyncing(true)
    syncDataConnection(
      {
        connectionId: connection._id,
      },
      {
        onSettled: () => {
          wait(1000 * 4).then(() => {
            setIsSyncing(false)
          })
        },
        onSuccess: () => {
          toast({
            variant: "success",
            description: "Data connection is synchronizing",
          })
        },
        onError: () => {
          toast({
            variant: "error",
            description: "There was an error synchronizing the data connection",
          })
        },
      }
    )
  }, [connection, syncDataConnection, toast])

  const latestSyncEnd = useMemo(() => {
    return getDataConnectionLatestSyncEnd(connection)
  }, [connection])

  return (
    <div className={cn(className)} {...divProps}>
      <div className="rounded-2xl bg-foreground/5">
        <Card className="justify-between gap-4 rounded-2xl px-4 md:flex-row md:items-center md:px-6">
          <div className="flex min-w-0 flex-row items-center gap-4">
            <DataConnectionAvatar connection={connection} provider={provider} />
            <div className="flex min-w-0 flex-col gap-0">
              <Typography
                variant="heading-4"
                component="p"
                className="truncate"
              >
                {connection.profile.name}
              </Typography>
              <div className="text-muted-foreground">
                <Typography variant="base-s-semibold" className="truncate">
                  {connection.profile.readableId}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 md:flex-row">
            <Button
              variant="outline"
              onClick={handleSyncClick}
              disabled={isSyncing || connection.syncStatus !== "connected"}
            >
              {isSyncing || connection.syncStatus === "active"
                ? "Syncing..."
                : "Sync"}
            </Button>
            <DisconnectDataConnectionDialog connection={connection}>
              <DisconnectDataConnectionDialogTrigger asChild>
                <Button variant="outline-destructive">Disconnect</Button>
              </DisconnectDataConnectionDialogTrigger>
            </DisconnectDataConnectionDialog>
          </div>
        </Card>
        <div className="flex flex-col justify-between gap-6 px-4 py-4 md:flex-row md:items-center md:px-6">
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
            <div className="text-muted-foreground">
              <Typography variant="base-regular">Last synced</Typography>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Typography variant="heading-5" component="p">
                {latestSyncEnd
                  ? intlFormat(latestSyncEnd, LONG_DATE_TIME_FORMAT_OPTIONS)
                  : EMPTY_VALUE_FALLBACK}
              </Typography>
              <TooltipIndicator content="Sync runs at most once per hour" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
            <div className="text-muted-foreground">
              <Typography variant="base-regular">Status</Typography>
            </div>
            <DataConnectionStatusBadge status={connection.syncStatus} />
          </div>
        </div>
      </div>
    </div>
  )
}
DataConnectionDetails.displayName = "DataConnectionDetails"
