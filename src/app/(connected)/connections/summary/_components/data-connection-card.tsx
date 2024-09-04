"use client"

import Link from "next/link"

import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DataConnection, useDataProvider } from "@/features/data-connections"
import { getConnectionPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type DataConnectionCardProps = {
  connection: DataConnection
} & React.ComponentProps<typeof Card>

export function DataConnectionCard(props: DataConnectionCardProps) {
  const { connection, className, ...cardProps } = props

  const { provider } = useDataProvider(connection.provider)

  return (
    <Card className={cn(className)} {...cardProps}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-row items-start justify-between gap-4">
          <div className="relative">
            <Avatar className="size-12">
              <AvatarImage
                src={connection.profile.avatar.uri}
                alt={connection.profile.name}
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
              <Skeleton className="size-12 rounded-full" />
            )}
          </div>
          <Button size="lg" variant="outline" asChild>
            <Link
              href={getConnectionPageRoute({
                connectionId: connection.name,
              })}
            >
              Details
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {provider?.label ? (
            <Typography variant="heading-4">{provider.label}</Typography>
          ) : (
            <Skeleton className="h-6 w-32" />
          )}
          <Typography variant="base-regular">
            {connection.profile.email}
          </Typography>
        </div>
      </div>
    </Card>
  )
}
DataConnectionCard.displayName = "DataConnectionCard"
