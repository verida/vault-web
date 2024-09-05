"use client"

import { useCallback, useState } from "react"

import {
  DisconnectDataConnectionDialog,
  DisconnectDataConnectionDialogTrigger,
} from "@/app/(connected)/connections/[connectionId]/_components/disconnect-data-connection-dialog"
import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DataConnection,
  useDataProvider,
  useSyncDataConnection,
} from "@/features/data-connections"
import { Logger } from "@/features/telemetry"
import { cn } from "@/styles/utils"

const logger = Logger.create("DataConnectionDetails")

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})

export type DataConnectionDetailsProps = {
  connection: DataConnection
} & React.ComponentProps<"div">

export function DataConnectionDetails(props: DataConnectionDetailsProps) {
  const { connection, className, ...divProps } = props

  const [isSyncing, setIsSyncing] = useState(false)

  const { provider } = useDataProvider(connection.provider)
  const { syncDataConnection } = useSyncDataConnection()

  const handleSyncClick = useCallback(async () => {
    setIsSyncing(true)

    try {
      await syncDataConnection({
        providerId: connection.provider,
        accountId: connection.providerId,
      })
    } catch (error) {
      logger.warn("Error syncing data connection")
      logger.error(error)
    } finally {
      setIsSyncing(false)
    }
  }, [connection.provider, connection.providerId, syncDataConnection])

  return (
    <div className={cn(className)} {...divProps}>
      <div className="rounded-2xl bg-foreground/5">
        <Card className="flex flex-col justify-between gap-4 rounded-2xl px-4 py-6 md:flex-row md:items-center md:px-6">
          <div className="flex min-w-0 flex-row items-center gap-4">
            <div className="relative shrink-0">
              <Avatar className="size-12">
                <AvatarImage
                  alt="Connection Avatar"
                  src={connection.profile.avatar.uri}
                  width={48}
                  height={48}
                />
                <AvatarFallback>
                  {connection.profile.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {provider ? (
                <Avatar className="absolute -bottom-1 -right-1 size-5">
                  <AvatarImage src={provider.icon} alt={provider.label} />
                  <AvatarFallback>
                    {provider.label?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-surface">
                  <Skeleton className="size-5 rounded-full" />
                </div>
              )}
            </div>
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
                  {connection.profile.email}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 md:flex-row">
            <DisconnectDataConnectionDialog connection={connection}>
              <DisconnectDataConnectionDialogTrigger asChild>
                <Button variant="outline-destructive">Disconnect</Button>
              </DisconnectDataConnectionDialogTrigger>
            </DisconnectDataConnectionDialog>
            <Button
              variant="outline"
              onClick={handleSyncClick}
              disabled={isSyncing}
            >
              {isSyncing ? "Syncing..." : "Sync All"}
            </Button>
          </div>
        </Card>
        <div className="flex flex-col justify-between gap-6 px-4 py-4 md:flex-row md:items-center md:px-6">
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
            <div className="text-muted-foreground">
              <Typography variant="base-regular">Last synced</Typography>
            </div>
            <Typography variant="heading-5" component="p">
              {dateFormatter.format(new Date(connection.syncEnd))}
            </Typography>
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
