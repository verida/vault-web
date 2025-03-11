"use client"

import { formatDistanceToNow } from "date-fns"
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { AssistantDataStatusPopover } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-data-status-popover"
import { Typography } from "@/components/ui/typography"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { cn } from "@/styles/utils"

export type AssistantDataStatusProps = Omit<ComponentProps<"div">, "children">

export function AssistantDataStatus(props: AssistantDataStatusProps) {
  const { className, ...divProps } = props

  const { connections, isAnySyncing, latestSync } = useDataConnections()

  const [formattedLatestSync, setFormattedLatestSync] = useState<string>("")

  const updateFormattedLatestSync = useCallback(() => {
    if (latestSync) {
      setFormattedLatestSync(
        // TODO: If relevant, use the functions in utils instead of date-fns
        formatDistanceToNow(latestSync, { addSuffix: true })
      )
    }
  }, [latestSync])

  useEffect(() => {
    updateFormattedLatestSync()
    const intervalId = setInterval(updateFormattedLatestSync, 60000) // Update every minute
    return () => clearInterval(intervalId)
  }, [updateFormattedLatestSync])

  const statusMessage = useMemo(() => {
    if (isAnySyncing) {
      return "Data currently syncing..."
    }

    if (connections === undefined) {
      return "Checking data connections..."
    }

    if (connections.length === 0) {
      return "No data connections"
    }

    if (!latestSync) {
      return "Data connections not synced"
    }

    return `Data synced ${formattedLatestSync}`
  }, [isAnySyncing, connections, latestSync, formattedLatestSync])

  return (
    <div
      {...divProps}
      className={cn(
        "flex flex-row items-center gap-2 text-muted-foreground",
        className
      )}
    >
      <AssistantDataStatusPopover />
      <Typography variant="base-s-regular">{statusMessage}</Typography>
    </div>
  )
}
AssistantDataStatus.displayName = "AssistantDataStatus"
