import { useMemo } from "react"

import { InboxData } from "@/components/icons/inbox-data"
import { InboxIncoming } from "@/components/icons/inbox-incoming"
import { InboxMessage } from "@/components/icons/inbox-message"
import { InboxProof } from "@/components/icons/inbox-proof"
import { Typography } from "@/components/typography"
import { InboxType } from "@/features/inbox/types"
import { cn } from "@/styles/utils"

type InboxMessageTypeIndicatorProps = {
  type: string
} & Omit<React.ComponentProps<"div">, "children">

export function InboxMessageTypeIndicator(
  props: InboxMessageTypeIndicatorProps
) {
  const { type, className, ...divProps } = props

  const label = useMemo(() => {
    switch (type) {
      case InboxType.DATA_REQUEST:
        return "Data Request"
      case InboxType.DATA_SEND:
        return "Incoming Data"
      case InboxType.DATASTORE_SYNC:
        return "Data store"
      case InboxType.MESSAGE:
        return "Message"
      default:
        return type
    }
  }, [type])

  const Icon = useMemo(() => {
    switch (type) {
      case InboxType.DATA_REQUEST:
        return InboxData
      case InboxType.DATA_SEND:
        return InboxIncoming
      case InboxType.DATASTORE_SYNC:
        return InboxProof
      case InboxType.MESSAGE:
        return InboxMessage
      default:
        return null
    }
  }, [type])

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      {Icon ? <Icon className="size-4" /> : null}
      <Typography variant="base-s-regular">{label}</Typography>
    </div>
  )
}
InboxMessageTypeIndicator.displayName = "InboxMessageTypeIndicator"
