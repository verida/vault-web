"use client"

import React from "react"

import { DataConnectionDetails } from "@/app/(connected)/connections/[connectionId]/_components/data-connection-details"
import { SupportedDataCard } from "@/app/(connected)/connections/[connectionId]/_components/supported-data-card"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DataConnection,
  MOCK_SUPPORTED_DATA,
  useDataProvider,
} from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionPageContentProps = {
  connection: DataConnection
} & React.ComponentProps<"div">

export function DataConnectionPageContent(
  props: DataConnectionPageContentProps
) {
  const { connection, className, ...divProps } = props

  const { provider } = useDataProvider(connection.provider)

  return (
    <div
      className={cn("flex flex-col gap-8 md:gap-10", className)}
      {...divProps}
    >
      <div className="flex flex-col gap-6">
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
        <DataConnectionDetails connection={connection} />
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        <Typography variant="heading-3">Supported Data Types</Typography>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_SUPPORTED_DATA.map((data, index) => (
            <SupportedDataCard data={data} key={index} />
          ))}
        </div>
      </div>
      {/* TODO: Add the logs section */}
    </div>
  )
}
DataConnectionPageContent.displayName = "DataConnectionPageContent"
