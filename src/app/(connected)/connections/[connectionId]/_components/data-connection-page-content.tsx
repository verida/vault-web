"use client"

import React from "react"

import { DataConnectionDetails } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-details"
import { DataConnectionLogs } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-logs"
import { DataConnectionsHandlersList } from "@/app/(connected)/connections/[connectionId]/_components/data-connections-handlers-list"
import { PageTitle, PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { DataConnection } from "@/features/data-connections/types"
import { getConnectionsSummaryPageRoute } from "@/features/routes/utils"

export type DataConnectionPageContentProps = {
  connection: DataConnection
}

export function DataConnectionPageContent(
  props: DataConnectionPageContentProps
) {
  const { connection } = props

  const { provider, isLoading } = useDataProvider(connection.providerId)

  return (
    <PageWrapper
      pageTitle={
        <div className="flex items-center gap-2">
          {provider ? (
            <Avatar className="size-10">
              <AvatarImage src={provider.icon} alt={provider.label} />
              <AvatarFallback>
                {provider.label?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : isLoading ? (
            <Skeleton className="size-12 rounded-full" />
          ) : null}
          {provider ? (
            <PageTitle>{provider.label}</PageTitle>
          ) : isLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <PageTitle>-</PageTitle>
          )}
        </div>
      }
      backNavigationHref={getConnectionsSummaryPageRoute()}
      backNavigationLabel="Back to all Connections"
      contentClassName="gap-8 md:gap-10"
    >
      <DataConnectionDetails connection={connection} />
      <section className="flex flex-col gap-4 md:gap-6">
        <Typography variant="heading-3">Services and Data</Typography>
        <DataConnectionsHandlersList
          connectionHandlers={connection.handlers}
          providerId={connection.providerId}
        />
      </section>
      <section className="flex flex-col gap-4 md:gap-0">
        <Typography variant="heading-3">Logs</Typography>
        <DataConnectionLogs connection={connection} />
      </section>
    </PageWrapper>
  )
}
DataConnectionPageContent.displayName = "DataConnectionPageContent"
