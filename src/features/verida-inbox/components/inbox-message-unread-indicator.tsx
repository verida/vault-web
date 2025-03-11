import { ComponentProps } from "react"

import { cn } from "@/styles/utils"

export type InboxMessageUnreadIndicatorProps = Omit<
  ComponentProps<"div">,
  "children"
>

export function InboxMessageUnreadIndicator(
  props: InboxMessageUnreadIndicatorProps
) {
  const { className, ...divProps } = props

  return (
    <div
      className={cn("relative size-2 rounded-full bg-accent", className)}
      {...divProps}
    />
  )
}
InboxMessageUnreadIndicator.displayName = "InboxMessageUnreadIndicator"
