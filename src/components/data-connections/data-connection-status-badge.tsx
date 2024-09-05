import { type VariantProps, cva } from "class-variance-authority"

import { Typography } from "@/components/typography"
import { cn } from "@/styles/utils"

export const badgeVariants = cva(
  "inline-flex items-center rounded-md px-3 py-1 transition-colors",
  {
    variants: {
      variant: {
        connected: "bg-status-connected text-status-connected-foreground",
        unknown: "bg-muted text-foreground",
      },
    },
    defaultVariants: {
      variant: "unknown",
    },
  }
)

type BadgeVariants = VariantProps<typeof badgeVariants>

export type DataConnectionStatusBadgeProps = {
  status: string // TODO: Define enum for status
} & Omit<React.ComponentProps<"div">, "children">

export function DataConnectionStatusBadge(
  props: DataConnectionStatusBadgeProps
) {
  const { status, className, ...divProps } = props

  const variant: BadgeVariants["variant"] =
    status === "connected" ? "connected" : "unknown"

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...divProps}>
      <Typography variant="base-semibold" component="p" className="capitalize">
        {variant}
      </Typography>
    </div>
  )
}
