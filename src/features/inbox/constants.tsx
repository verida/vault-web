import { InboxData } from "@/components/icons/inbox-data"
import { InboxIncoming } from "@/components/icons/inbox-incoming"
import { InboxMessage } from "@/components/icons/inbox-message"
import { InboxProof } from "@/components/icons/inbox-proof"
import { InboxType } from "@/features/inbox/types"

/**
 * @deprecated
 */
export const INBOX_TYPE_DEFS = {
  [InboxType.MESSAGE]: {
    icon: InboxMessage,
    text: "Message",
  },
  [InboxType.DATASTORE_SYNC]: {
    icon: InboxProof,
    text: "Data store",
  },
  [InboxType.DATA_REQUEST]: {
    icon: InboxData,
    text: "Data Request",
  },
  [InboxType.DATA_SEND]: {
    icon: InboxIncoming,
    text: "Incoming Data",
  },
}
