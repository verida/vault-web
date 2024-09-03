"use client"

import React from "react"

import {
  DisconnectDataConnectionDialog,
  DisconnectDataConnectionDialogTrigger,
} from "@/app/(connected)/connections/[connectionId]/_components/disconnect-data-connection-dialog"
import { DataConnectionLogs } from "@/app/(connected)/connections/_components/data-connection-logs"
import { SupportedDataCard } from "@/app/(connected)/connections/_components/supported-data-card"
import { SubPageWrapper } from "@/components/sub-page-wrapper"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DataConnection,
  MOCK_SUPPORTED_DATA,
} from "@/features/data-connections"
import { getConnectionsPageRoute } from "@/features/routes/utils"
import { useVerida } from "@/features/verida"

export type DataConnectionDetailsProps = {
  connection: DataConnection
}

export function DataConnectionDetails(props: DataConnectionDetailsProps) {
  const { connection } = props

  const { profile } = useVerida()

  return (
    <SubPageWrapper
      backNavigationHref={getConnectionsPageRoute()}
      backNavigationLabel="Back to all Connections"
    >
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2">
            {connection.icon ? (
              // <Image
              //   src={connection.icon}
              //   alt={connection.label}
              //   width={40}
              //   height={40}
              //   className="size-10 rounded-full border"
              // />
              /* eslint-disable @next/next/no-img-element */
              <img
                src={connection.icon}
                alt={connection.label}
                width={40}
                height={40}
                className="size-10 rounded-full border"
              />
            ) : null}
            <Typography variant="heading-4">{connection.label}</Typography>
          </div>

          <div className="mt-6">
            <div className="rounded-2xl bg-foreground/5">
              <Card className="flex flex-col justify-between gap-4 rounded-2xl p-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative size-12">
                    <Avatar className="size-12">
                      <AvatarImage
                        alt="Avatar"
                        src={profile?.avatar?.uri ?? ""}
                        width={48}
                        height={48}
                      />
                      <AvatarFallback>
                        {profile?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {connection.icon ? (
                      // <Image
                      //   src={connection.icon}
                      //   alt={connection.label}
                      //   width={48}
                      //   height={48}
                      //   className="absolute bottom-0 right-0 size-5 rounded-full border border-white"
                      // />
                      /* eslint-disable @next/next/no-img-element */
                      <img
                        src={connection.icon}
                        alt={connection.label}
                        width={48}
                        height={48}
                        className="absolute bottom-0 right-0 size-5 rounded-full border border-white"
                      />
                    ) : null}
                  </div>
                  <div>
                    <Typography variant="heading-5">{profile?.name}</Typography>
                    <Typography variant="base-s-semibold">
                      {connection.userId}
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <DisconnectDataConnectionDialog
                    connectionId={connection.name}
                  >
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
                  <Typography variant="heading-5">
                    4 Feb 2023, 10:00am
                  </Typography>
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

        <DataConnectionLogs />
      </div>
    </SubPageWrapper>
  )
}
DataConnectionDetails.displayName = "DataConnectionDetails"
