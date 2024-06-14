import { InboxEntry } from "@/features/inbox/types";
import { InboxMessageDetails } from "./details/message";

export interface InboxDetailsProps {
  message: InboxEntry;
}

export const InboxDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  return (
    <>
      <InboxMessageDetails message={message} />
    </>
  );
};
