"use client"

import { formatDistanceToNow } from "date-fns"

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

  return (
    <div
      {...divProps}
      className={cn("flex flex-row gap-1 text-muted-foreground", className)}
    >
      <Typography variant="base-s-regular">
        {hotload.status === "loading"
          ? `Data loading in assistant... ${Math.round(hotload.progress * 100)}%`
          : isAnySyncing
            ? "Data currently syncing..."
            : latestSync
              ? `Data synced ${formatDistanceToNow(latestSync, { addSuffix: true })}`
              : "Data sync unknown"}
      </Typography>
    </div>
  )
}
AssistantDataStatus.displayName = "AssistantDataStatus"
