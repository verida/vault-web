import { useMemo } from "react"

import { Failed } from "@/components/icons/failed"
import { Success } from "@/components/icons/success"
import { Typography } from "@/components/typography"
import {
  VeridaInboxMessageTypeDataRequestDataSchema,
  VeridaInboxMessageTypeDataSendDataSchema,
} from "@/features/verida-inbox/schemas"
import { VeridaInboxMessageSupportedType } from "@/features/verida-inbox/types"
import { cn } from "@/styles/utils"

type Status = "accepted" | "rejected" | "pending" | null

export type InboxMessageStatusProps = {
  messageType?: string
  messageData?: unknown
} & Omit<React.ComponentProps<"div">, "children">

export function InboxMessageStatus(props: InboxMessageStatusProps) {
  const { messageType, messageData, className, ...divProps } = props

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
      {status === "rejected" ? <Failed className="size-4" /> : null}
      {status === "accepted" ? <Success className="size-4" /> : null}
      <Typography variant="base-s-regular" className="capitalize">
        {status}
      </Typography>
    </div>
  )
}
InboxMessageStatus.displayName = "InboxMessageStatus"

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
