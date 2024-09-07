import { type VariantProps, cva } from "class-variance-authority"
import { useMemo } from "react"

import { Typography } from "@/components/typography"
import {
  DataConnectionHandlerStatus,
  DataConnectionStatus,
} from "@/features/data-connections"
import { cn } from "@/styles/utils"

export const badgeVariants = cva(
  "inline-flex items-center rounded-md px-3 py-1 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        info: "bg-status-info text-status-info-foreground",
        success: "bg-status-success text-status-success-foreground",
        warning: "bg-status-warning text-status-warning-foreground",
        error: "bg-status-error text-status-error-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeVariants = VariantProps<typeof badgeVariants>

export type DataConnectionStatusBadgeProps = {
  status: DataConnectionStatus | DataConnectionHandlerStatus
} & Omit<React.ComponentProps<"div">, "children">

export function DataConnectionStatusBadge(
  props: DataConnectionStatusBadgeProps
) {
  const { status, className, ...divProps } = props

  const variant: BadgeVariants["variant"] = useMemo(() => {
    switch (status) {
      // case "sync-active":
      case "connected":
      case "active":
      case "enabled":
      case "syncing":
        return "success"
      case "error":
        return "error"
      case "paused":
        return "warning"
      case "disabled":
      default:
        return "default"
    }
  }, [status])

  const label = useMemo(() => {
    switch (status) {
      case "connected":
        return "Connected"
      case "error":
        return "Error"
      case "paused":
        return "Paused"
      // case "sync-active":
      case "active":
      case "syncing":
        return "Syncing..."
      case "enabled":
        return "Enabled"
      case "disabled":
        return "Disabled"
      default:
        return "Unknown"
    }
  }, [status])

  const animate = useMemo(() => {
    return status === "syncing" || status === "active"
  }, [status])

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...divProps}>
      <Typography
        variant="base-semibold"
        component="p"
        className={cn("capitalize", animate ? "animate-pulse" : "")}
      >
        {label}
      </Typography>
    </div>
  )
}
