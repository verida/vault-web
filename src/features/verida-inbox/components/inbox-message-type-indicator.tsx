import { ComponentProps, useMemo } from "react"

import { InboxDataRequestTypeIcon } from "@/components/icons/inbox-data"
import { InboxIncomingDataTypeIcon } from "@/components/icons/inbox-incoming"
import { InboxMessageTypeIcon } from "@/components/icons/inbox-message"
import { Typography } from "@/components/ui/typography"
import { VeridaInboxMessageSupportedType } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

export interface InboxMessageTypeIndicatorProps
  extends Omit<ComponentProps<"div">, "children"> {
  type: string
  isMessageUnread?: boolean
}

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
        return InboxMessageTypeIcon
      case VeridaInboxMessageSupportedType.DATA_SEND:
        return InboxIncomingDataTypeIcon
      case VeridaInboxMessageSupportedType.DATA_REQUEST:
        return InboxDataRequestTypeIcon
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
