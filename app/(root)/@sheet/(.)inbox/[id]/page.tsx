"use client";

import { useRouter } from "next/navigation";

import { ModalSheet } from "@/components/common/modal-sheet";
import { InboxDetails } from "@/components/inbox/inbox-details";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";

interface InboxItemPageProps {
  params: {
    id: string;
  };
}

const InboxItemPage: React.FC<InboxItemPageProps> = ({ params }) => {
  const router = useRouter();

  const { messagingEngine } = useInboxContext();
  const { messages } = useMessages(messagingEngine, { _id: params.id }, 0, 1);

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalSheet open onClose={handleClose}>
      {messages && <InboxDetails message={messages[0]} onClose={handleClose} />}
    </ModalSheet>
  );
};

export default InboxItemPage;
