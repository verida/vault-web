import { ReactElement, useMemo } from "react"

import { DataRequestDetails } from "@/components/inbox/details/data-request"
import InboxIncomingData from "@/components/inbox/details/incoming-data"
import { InboxMessageDetails } from "@/components/inbox/details/message"
import { InboxEntry, InboxType } from "@/features/inbox/types"

export type InboxDetailsProps = {
  message: InboxEntry
  onClose: () => void
}

export const InboxDetails: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
}) => {
  const DetailsComponent = useMemo((): ReactElement => {
    switch (message.type) {
      case InboxType.DATASTORE_SYNC:
      case InboxType.DATA_REQUEST:
        return <DataRequestDetails message={message} onClose={onClose} />
      case InboxType.DATA_SEND:
        return <InboxIncomingData message={message} onClose={onClose} />
      default:
        return <InboxMessageDetails message={message} onClose={onClose} />
    }
  }, [message, onClose])

  return <>{DetailsComponent}</>
}
