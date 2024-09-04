"use client"

import React from "react"

import {
  DisconnectDataConnectionDialog,
  DisconnectDataConnectionDialogTrigger,
} from "@/app/(connected)/connections/[connectionId]/_components/disconnect-data-connection-dialog"
import { SupportedDataCard } from "@/app/(connected)/connections/[connectionId]/_components/supported-data-card"
import { DataConnectionsLogsTable } from "@/components/data-connections/logs-table/data-connections-logs-table"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DataConnection,
  MOCK_DATA_CONNECTION_LOGS,
  MOCK_SUPPORTED_DATA,
  useDataProvider,
} from "@/features/data-connections"

export type DataConnectionDetailsProps = {
  connection: DataConnection
}

export function DataConnectionDetails(props: DataConnectionDetailsProps) {
  const { connection } = props

  const { provider } = useDataProvider(connection.provider)

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          {provider ? (
            <Avatar className="size-10">
              <AvatarImage src={provider.icon} alt={provider.label} />
              <AvatarFallback>
                {provider.label?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Skeleton className="size-12 rounded-full" />
          )}
          {provider ? (
            <Typography variant="heading-4">{provider?.label}</Typography>
          ) : (
            <Skeleton className="h-6 w-32" />
          )}
        </div>
        <div className="mt-6">
          <div className="rounded-2xl bg-foreground/5">
            <Card className="flex flex-col justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
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
                <div>
                  <Typography variant="heading-5">
                    {connection.profile.name}
                  </Typography>
                  <Typography variant="base-s-semibold">
                    {connection.profile.email}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <DisconnectDataConnectionDialog connection={connection}>
                  <DisconnectDataConnectionDialogTrigger asChild>
                    <Button variant="outline-destructive">Disconnect</Button>
                  </DisconnectDataConnectionDialogTrigger>
                </DisconnectDataConnectionDialog>
                <Button variant="outline">Disable</Button>
                <Button variant="outline">Sync All Data</Button>
              </div>
            </Card>

            <div className="flex flex-col justify-between gap-6 px-6 py-5 md:flex-row md:items-center">
              <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                <Typography variant="base-regular">
                  Synced data items
                </Typography>
                <Typography variant="heading-5">563</Typography>
              </div>
              <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                <Typography variant="base-regular">Last synced</Typography>
                <Typography variant="heading-5">4 Feb 2023, 10:00am</Typography>
              </div>
              <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                <Typography variant="base-regular">Status</Typography>
                <Typography
                  className="rounded-md bg-status-connected px-3 py-1 text-status-connected-foreground"
                  variant="base-semibold"
                >
                  Connected
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <Typography variant="heading-3">Supported Data Types</Typography>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_SUPPORTED_DATA.map((data, index) => (
            <SupportedDataCard data={data} key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Typography variant="heading-3">Connection Logs</Typography>
        <DataConnectionsLogsTable logs={MOCK_DATA_CONNECTION_LOGS} />
      </div>
    </div>
  )
}
DataConnectionDetails.displayName = "DataConnectionDetails"
