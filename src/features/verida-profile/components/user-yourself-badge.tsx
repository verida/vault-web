import { type ComponentProps } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/styles/utils"

export type UserYourselfBadgeProps = Omit<
  ComponentProps<typeof Badge>,
  "children"
>

export function UserYourselfBadge(props: UserYourselfBadgeProps) {
  const { variant = "secondary", className, ...badgeProps } = props

  return (
    <Badge
      variant={variant}
      className={cn("shrink-0 rounded-lg px-1 py-0.5 font-normal", className)}
      {...badgeProps}
    >
      You
    </Badge>
  )
}
UserYourselfBadge.displayName = "UserYourselfBadge"
