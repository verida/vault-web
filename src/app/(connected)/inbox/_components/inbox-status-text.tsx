import { Failed } from "@/components/icons/failed"
import { Success } from "@/components/icons/success"
import { Typography } from "@/components/typography"
import { InboxType } from "@/features/inbox/types"

export type InboxStatusProps = {
  status?: "accept" | "decline"
  inboxType?: InboxType
}

/**
 * @deprecated
 */
export function InboxStatusText(props: InboxStatusProps) {
  const { status, inboxType } = props

  if (inboxType === InboxType.MESSAGE) {
    return null
  }

  if (status === "accept") {
    return (
      <div className="flex items-center gap-2">
        <Success />
        <Typography variant="base-semibold">Accepted</Typography>
      </div>
    )
  }

  if (status === "decline")
    return (
      <div className="flex items-center gap-2">
        <Failed />
        <Typography variant="base-semibold">Declined</Typography>
      </div>
    )

  return null
}
