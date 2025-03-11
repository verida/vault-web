import { type SVGProps } from "react"

import { StatusDebugIcon } from "@/components/icons/status-debug-icon"
import { StatusErrorIcon } from "@/components/icons/status-error-icon"
import { StatusInfoIcon } from "@/components/icons/status-info-icon"
import { StatusWarningIcon } from "@/components/icons/status-warning-icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { DataConnectionSyncLogLevel } from "@/features/data-connections/types"
import { cn } from "@/styles/utils"

export interface DataConnectionLogLevelBadgeProps
  extends Pick<SVGProps<SVGSVGElement>, "className"> {
  level: DataConnectionSyncLogLevel
}

export function DataConnectionLogLevelBadge(
  props: DataConnectionLogLevelBadgeProps
) {
  const { level, className } = props

  const levelLabel = {
    error: "Error",
    warning: "Warning",
    info: "Info",
    debug: "Debug",
  }[level]

  const Icon = {
    error: StatusErrorIcon,
    warning: StatusWarningIcon,
    info: StatusInfoIcon,
    debug: StatusDebugIcon,
  }[level]

  return (
    <Tooltip>
      <TooltipTrigger className="rounded-full p-0 ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0">
        <Icon className={cn("size-5", className)} />
      </TooltipTrigger>
      <TooltipContent>{levelLabel}</TooltipContent>
    </Tooltip>
  )
}
DataConnectionLogLevelBadge.displayName = "DataConnectionLogLevelBadge"
