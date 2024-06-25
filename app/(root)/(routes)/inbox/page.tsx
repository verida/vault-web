<<<<<<< HEAD
"use client";

import { Filter } from "@/components/icons/filter";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
import { useInbox } from "@/features/inbox/hooks";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";

import { InboxRowItem } from "@/components/inbox/inbox-item";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LoadingInbox } from "@/components/inbox/inbox-loading";
import { InboxDetails } from "@/components/inbox/inbox-details";
import { InboxEntry } from "@/features/inbox/types";

const InboxPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const { messagingEngine } = useInboxContext();
  const { totalMessageCount, isTotalMessageCountPending, isUnreadMessageCountPending } = useInbox();
  const { messages, isMessagesPending, isMessagesError } = useMessages(messagingEngine, {}, offset, limit);

  const [messageId, setMessageId] = useState<string>("");

  const selectedMessage = messages?.find((message: any) => message._id === messageId) as InboxEntry;

  const isLoading = useMemo(() => {
    return isTotalMessageCountPending || isUnreadMessageCountPending || isMessagesPending;
  }, [isTotalMessageCountPending, isUnreadMessageCountPending, isMessagesPending]);

  const handleSearchInputChange = (value: string) => {};

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  console.log(messages);

  return (
    <>
      <div className='flex flex-col pt-10 pb-6 space-y-6 flex-grow'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Inbox</h1>
          <nav className='flex space-x-3 w-full md:w-auto'>
            <SearchInput onValueChange={handleSearchInputChange} />
            <Button variant='outline' size='lg' className='text-gray-500 py-[10px] md:px-4 space-x-2 p-[10px]'>
              <Filter /> <span className='hidden md:block'>Filter</span>
            </Button>
          </nav>
        </div>

        {isLoading && <LoadingInbox />}

        {!isLoading && messages && (
          <div className='flex-grow flex flex-col items-center gap-3'>
            {messages.map((message: any) => (
              <InboxRowItem
                key={`inbox-row-${message._id}`}
                message={message}
                onClick={(id: string) => setMessageId(id)}
              />
            ))}
          </div>
        )}

        <TablePagination totalItems={totalMessageCount} onChange={handlePageChange} />
      </div>
      <Drawer
        direction='right'
        open={Boolean(messageId)}
        onClose={() => {
          setMessageId("");
        }}
      >
        <DrawerTrigger />
        <DrawerContent>
          {selectedMessage && <InboxDetails message={selectedMessage} onClose={() => setMessageId("")} />}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InboxPage;
=======
import Link from "next/link";

import { cn } from "@/lib/utils";

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">Inbox</div>
  );
};

export default MarketingPage;
>>>>>>> develop
