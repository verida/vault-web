import { useMemo } from "react"

import { InboxData } from "@/components/icons/inbox-data"
import { InboxIncoming } from "@/components/icons/inbox-incoming"
import { InboxMessage } from "@/components/icons/inbox-message"
import { Typography } from "@/components/typography"
import { VeridaInboxMessageSupportedType } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

type InboxMessageTypeIndicatorProps = {
  type: string
  isMessageUnread?: boolean
} & Omit<React.ComponentProps<"div">, "children">

export function InboxMessageTypeIndicator(
  props: InboxMessageTypeIndicatorProps
) {
  const { type, isMessageUnread, className, ...divProps } = props

  const label = useMemo(() => {
    switch (type) {
      case VeridaInboxMessageSupportedType.MESSAGE:
        return "Message"
      case VeridaInboxMessageSupportedType.DATA_SEND:
        return "Incoming Data"
      case VeridaInboxMessageSupportedType.DATA_REQUEST:
        return "Data Request"
      default:
        return type
    }
  }, [type])

  const Icon = useMemo(() => {
    switch (type) {
      case VeridaInboxMessageSupportedType.MESSAGE:
        return InboxMessage
      case VeridaInboxMessageSupportedType.DATA_SEND:
        return InboxIncoming
      case VeridaInboxMessageSupportedType.DATA_REQUEST:
        return InboxData
      default:
        return null
    }
  }, [type])

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <Typography
        variant={isMessageUnread ? "base-s-semibold" : "base-s-regular"}
      >
        {label}
      </Typography>
    </div>
  )
}
InboxMessageTypeIndicator.displayName = "InboxMessageTypeIndicator"
