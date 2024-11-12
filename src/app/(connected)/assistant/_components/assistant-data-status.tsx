"use client"

import { formatDistanceToNow } from "date-fns"
import { useCallback, useEffect, useMemo, useState } from "react"

import { AssistantDataStatusPopover } from "@/app/(connected)/assistant/_components/assistant-data-status-popover"
import { Typography } from "@/components/typography"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { cn } from "@/styles/utils"

export type AssistantDataStatusProps = Omit<
  React.ComponentProps<"div">,
  "children"
>

export function AssistantDataStatus(props: AssistantDataStatusProps) {
  const { className, ...divProps } = props

  const { hotload } = useAssistants()
  const { connections, isAnySyncing, latestSync } = useDataConnections()

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

  const statusMessage = useMemo(() => {
    if (hotload.status === "loading") {
      return `Data loading in assistant... ${Math.round(hotload.progress * 100)}%`
    }

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
  }, [
    hotload.status,
    hotload.progress,
    isAnySyncing,
    connections,
    latestSync,
    formattedLatestSync,
  ])

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
