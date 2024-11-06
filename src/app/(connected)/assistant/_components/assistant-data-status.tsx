"use client"

import { formatDistanceToNow } from "date-fns"
import { useCallback, useEffect, useState } from "react"

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
  const { isAnySyncing, latestSync } = useDataConnections()

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

  return (
    <div
      {...divProps}
      className={cn(
        "flex flex-row items-center gap-2 text-muted-foreground",
        className
      )}
    >
      <AssistantDataStatusPopover />
      <Typography variant="base-s-regular">
        {hotload.status === "loading"
          ? `Data loading in assistant... ${Math.round(hotload.progress * 100)}%`
          : isAnySyncing
            ? "Data currently syncing..."
            : latestSync
              ? `Data synced ${formattedLatestSync}`
              : "Data sync unknown"}
      </Typography>
    </div>
  )
}
AssistantDataStatus.displayName = "AssistantDataStatus"
