import { CheckIcon, CircleDashedIcon, XIcon } from "lucide-react"
import { useMemo } from "react"

import { Typography } from "@/components/typography"
import {
  VeridaInboxMessageTypeDataRequestDataSchema,
  VeridaInboxMessageTypeDataSendDataSchema,
} from "@/features/verida-inbox/schemas"
import { VeridaInboxMessageSupportedType } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

type Status = "accepted" | "rejected" | "pending" | null

export type InboxMessageStatusIndicatorProps = {
  messageType?: string
  messageData?: unknown
  isMessageUnread?: boolean
} & Omit<React.ComponentProps<"div">, "children">

export function InboxMessageStatusIndicator(
  props: InboxMessageStatusIndicatorProps
) {
  const { messageType, messageData, isMessageUnread, className, ...divProps } =
    props

  const status = useMemo(
    () => getMessageStatus(messageType, messageData),
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
      {status === "rejected" ? (
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
InboxMessageStatusIndicator.displayName = "InboxMessageStatus"

function getMessageStatus(messageType?: string, messageData?: unknown): Status {
  switch (messageType) {
    case VeridaInboxMessageSupportedType.MESSAGE:
      // no status in a plain message
      return null
    case VeridaInboxMessageSupportedType.DATA_SEND: {
      const dataValidationResult =
        VeridaInboxMessageTypeDataSendDataSchema.safeParse(messageData)

      if (!dataValidationResult.success) {
        return null
      }

      switch (dataValidationResult.data.status) {
        case "accept":
          return "accepted"
        case "reject":
          return "rejected"
        default:
          return "pending"
      }
    }
    case VeridaInboxMessageSupportedType.DATA_REQUEST: {
      const dataValidationResult =
        VeridaInboxMessageTypeDataRequestDataSchema.safeParse(messageData)

      if (!dataValidationResult.success) {
        return null
      }

      switch (dataValidationResult.data.status) {
        case "accept":
          return "accepted"
        case "reject":
          return "rejected"
        default:
          return "pending"
      }
    }
    default:
      return null
  }
}
InboxMessageStatusIndicator.displayName = "InboxMessageStatusIndicator"
