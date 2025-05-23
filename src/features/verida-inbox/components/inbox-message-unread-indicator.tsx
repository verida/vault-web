import { type ComponentProps } from "react"

import { cn } from "@/styles/utils"

export interface InboxMessageUnreadIndicatorProps
  extends Omit<ComponentProps<"div">, "children"> {}

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
