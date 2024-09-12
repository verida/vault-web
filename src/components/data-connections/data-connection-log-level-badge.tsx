import { SVGProps } from "react"

import { AlertErrorIcon } from "@/components/icons/alert-error-icon"
import { AlertInfoIcon } from "@/components/icons/alert-info-icon"
import { AlertWarningIcon } from "@/components/icons/alert-warning-icon"
import { StatusDebugIcon } from "@/components/icons/status-debug-icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DataConnectionSyncLogLevel } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionLogLevelBadgeProps = {
  level: DataConnectionSyncLogLevel
} & Pick<SVGProps<SVGSVGElement>, "className">

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
    error: AlertErrorIcon,
    warning: AlertWarningIcon,
    info: AlertInfoIcon,
    debug: StatusDebugIcon,
  }[level]

  return (
    <Tooltip>
      <TooltipTrigger>
        <Icon className={cn("size-5", className)} />
      </TooltipTrigger>
      <TooltipContent>{levelLabel}</TooltipContent>
    </Tooltip>
  )
}
DataConnectionLogLevelBadge.displayName = "DataConnectionLogLevelBadge"
