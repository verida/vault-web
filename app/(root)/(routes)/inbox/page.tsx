"use client";

import { useInbox } from "@/features/inbox/hooks";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";
import { usePagination } from "@/hooks/usePagination";

const InboxPage = () => {
  const { messagingEngine } = useInboxContext();
  const { page, offset, limit } = usePagination();
  const { unreadMessageCount, totalMessageCount } = useInbox();
  const { messages } = useMessages(messagingEngine, {}, offset, limit);

  return <div className='flex items-center justify-center flex-col p-10'>Inbox</div>;
};

export default InboxPage;
