"use client"

import { formatDistanceToNow } from "date-fns"
import { useCallback, useEffect, useState } from "react"

import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { QuestionMarkIcon } from "@/components/icons/question-mark-icon"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDataConnection } from "@/features/data-connections/hooks/use-data-connection"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { useDataProvider } from "@/features/data-connections/hooks/use-data-provider"
import { DataConnection } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export type AssistantDataStatusPopoverProps = React.ComponentProps<
  typeof Button
>

export function AssistantDataStatusPopover(
  props: AssistantDataStatusPopoverProps
) {
  const { className, ...buttonProps } = props

  const { connections } = useDataConnections()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-5 rounded-full p-0", className)}
          {...buttonProps}
        >
          <QuestionMarkIcon className="size-5 shrink-0 text-muted-foreground" />
          <span className="sr-only">Show data connections status</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-8}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between gap-2 text-muted-foreground">
            <Typography variant="base-s-regular">Connections</Typography>
            <Typography variant="base-s-regular">Status</Typography>
          </div>
          <ul className="flex flex-col gap-2">
            {connections?.map((connection) => (
              <li key={connection._id}>
                <AssistantDataStatusPopoverItem connection={connection} />
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
AssistantDataStatusPopover.displayName = "AssistantDataStatusPopover"

type AssistantDataStatusPopoverItemProps = {
  connection: DataConnection
}

function AssistantDataStatusPopoverItem(
  props: AssistantDataStatusPopoverItemProps
) {
  const { connection } = props

  const { latestSync } = useDataConnection(connection._id)
  const { provider } = useDataProvider(connection.providerId)

  const [formattedLatestSync, setFormattedLatestSync] = useState<string>("")

  const updateFormattedLatestSync = useCallback(() => {
    if (latestSync) {
      setFormattedLatestSync(
        formatDistanceToNow(latestSync, { addSuffix: true })
      )
    }
  }, [latestSync])

  useEffect(() => {
    updateFormattedLatestSync()
    const intervalId = setInterval(updateFormattedLatestSync, 60000) // Update every minute
    return () => clearInterval(intervalId)
  }, [updateFormattedLatestSync])

  if (connection) {
    return (
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-1">
          <Avatar className="size-5">
            <AvatarImage src={provider?.icon} alt={provider?.label} />
            <AvatarFallback>
              {provider?.label?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Typography className="truncate">
            {connection.profile.readableId}
          </Typography>
        </div>
        <div className="shrink-0">
          {connection.syncStatus === "connected" ? (
            <div className="text-muted-foreground">
              <Typography variant="base-s-regular" className="leading-7">
                {`Synced ${formattedLatestSync || "unknown"}`}
              </Typography>
            </div>
          ) : (
            <DataConnectionStatusBadge status={connection.syncStatus} />
          )}
        </div>
      </div>
    )
  }

  return null
}
AssistantDataStatusPopoverItem.displayName = "AssistantDataStatusPopoverItem"
