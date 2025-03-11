import { CheckIcon, CircleDashedIcon, XIcon } from "lucide-react"
import { ComponentProps, useMemo } from "react"

import { Typography } from "@/components/ui/typography"
import { getVeridaMessageStatus } from "@/features/verida-inbox/utils"
import { cn } from "@/styles/utils"

export interface InboxMessageStatusIndicatorProps
  extends Omit<ComponentProps<"div">, "children"> {
  messageType?: string
  messageData?: unknown
  isMessageUnread?: boolean
}

export function InboxMessageStatusIndicator(
  props: InboxMessageStatusIndicatorProps
) {
  const { messageType, messageData, isMessageUnread, className, ...divProps } =
    props

  const status = useMemo(
    () => getVeridaMessageStatus(messageType, messageData),
    [messageType, messageData]
  )

  if (!status) {
    return null
  }

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      {status === "declined" ? (
        <XIcon className="size-4 text-status-error" />
      ) : null}
      {status === "pending" ? (
        <CircleDashedIcon className="size-4 animate-spin-slow text-status-warning" />
      ) : null}
      {status === "accepted" ? (
        <CheckIcon className="size-4 text-status-success" />
      ) : null}
      <Typography
        variant={isMessageUnread ? "base-s-semibold" : "base-s-regular"}
        className="capitalize"
      >
        {status}
      </Typography>
    </div>
  )
}
InboxMessageStatusIndicator.displayName = "InboxMessageStatusIndicator"
