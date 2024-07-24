import { ReactElement, useMemo } from "react";

import { InboxEntry, InboxType } from "@/features/inbox/types";

import { DataRequestDetails } from "./details/data-request";
import InboxIncomingData from "./details/incoming-data";
import { InboxMessageDetails } from "./details/message";

export interface InboxDetailsProps {
  message: InboxEntry;
  onClose?: () => void;
  refresh: () => void;
}

export const InboxDetails: React.FC<InboxDetailsProps> = ({
  message,
  onClose,
  refresh,
}) => {
  const DetailsComponent = useMemo((): ReactElement => {
    switch (message.type) {
      case InboxType.DATASTORE_SYNC:
      case InboxType.DATA_REQUEST:
        return (
          <DataRequestDetails
            message={message}
            onClose={onClose}
            refresh={refresh}
          />
        );
      case InboxType.DATA_SEND:
        return (
          <InboxIncomingData
            message={message}
            onClose={onClose}
            refresh={refresh}
          />
        );
      default:
        return (
          <InboxMessageDetails
            message={message}
            onClose={onClose}
            refresh={refresh}
          />
        );
    }
  }, [message, onClose]);

  return <>{DetailsComponent}</>;
};
