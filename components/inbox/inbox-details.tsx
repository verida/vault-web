import { ReactElement, ReactNode, useMemo } from "react";
import { InboxEntry, InboxType } from "@/features/inbox/types";
import { InboxMessageDetails } from "./details/message";
import InboxIncomingData from "./details/incoming-data";
import { Success } from "@/components/icons/success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { DataRequestDetails } from "./details/data-request";
export interface InboxDetailsProps {
  message: InboxEntry;
  onClose: () => void;
}

export const InboxDetails: React.FC<InboxDetailsProps> = ({ message, onClose }) => {
  const DetailsComponent = useMemo((): ReactElement => {
    switch (message.type) {
      case InboxType.DATASTORE_SYNC:
      case InboxType.DATA_REQUEST:
        return <DataRequestDetails message={message} onClose={onClose} />;
      case InboxType.DATA_SEND:
        return <InboxIncomingData message={message} onClose={onClose} />;
      default:
        return <InboxMessageDetails message={message} onClose={onClose} />;
    }
  }, [message, onClose]);

  return <>{DetailsComponent}</>;
};
