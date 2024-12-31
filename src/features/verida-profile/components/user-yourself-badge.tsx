import { Badge } from "@/components/ui/badge"
import { cn } from "@/styles/utils"

type UserYourselfBadgeProps = React.ComponentProps<typeof Badge>

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
