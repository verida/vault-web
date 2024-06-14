import { InboxMessage } from "@/components/icons/inbox-message";
import { InboxType } from "../types";
import { InboxIncoming } from "@/components/icons/inbox-incoming";
import { InboxData } from "@/components/icons/inbox-data";
import { InboxProof } from "@/components/icons/inbox-proof";

export const inboxTypes = {
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
};
