import { ReactElement, useMemo } from "react"

import { DataRequestDetails } from "@/app/(connected)/inbox/_components/data-request"
import { InboxIncomingData } from "@/app/(connected)/inbox/_components/incoming-data"
import { InboxMessageDetails } from "@/app/(connected)/inbox/_components/message"
import { InboxEntry, InboxType } from "@/features/inbox/types"

export type InboxDetailsProps = {
  message: InboxEntry
  onClose: () => void
}

export function InboxDetails(props: InboxDetailsProps) {
  const { message, onClose } = props

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
