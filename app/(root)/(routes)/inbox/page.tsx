"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Filter } from "@/components/icons/filter";
import { InboxDetails } from "@/components/inbox/inbox-details";
import { InboxRowItem } from "@/components/inbox/inbox-item";
import { LoadingInbox } from "@/components/inbox/inbox-loading";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { TablePagination } from "@/components/ui/table-pagination";
import { useInbox } from "@/features/inbox/hooks";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";
import { InboxEntry } from "@/features/inbox/types";

const InboxPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const { messagingEngine } = useInboxContext();
  const {
    totalMessageCount,
    isTotalMessageCountPending,
    isUnreadMessageCountPending,
  } = useInbox();
  const { messages, isMessagesPending, isMessagesError } = useMessages(
    messagingEngine,
    {},
    offset,
    limit
  );

  const [messageId, setMessageId] = useState<string>("");

  const selectedMessage = messages?.find(
    (message: any) => message._id === messageId
  ) as InboxEntry;

  const isLoading = useMemo(() => {
    return (
      isTotalMessageCountPending ||
      isUnreadMessageCountPending ||
      isMessagesPending
    );
  }, [
    isTotalMessageCountPending,
    isUnreadMessageCountPending,
    isMessagesPending,
  ]);

  const handleSearchInputChange = (value: string) => {};

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  console.log(messages);

  return (
    <>
      <div className="flex flex-grow flex-col space-y-6 pb-6 pt-10">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <nav className="flex w-full space-x-3 md:w-auto">
            <SearchInput onValueChange={handleSearchInputChange} />
            <Button
              variant="outline"
              size="lg"
              className="space-x-2 p-[10px] py-[10px] text-gray-500 md:px-4"
            >
              <Filter /> <span className="hidden md:block">Filter</span>
            </Button>
          </nav>
        </div>

        {isLoading && <LoadingInbox />}

        {!isLoading && messages && (
          <div className="flex flex-grow flex-col items-center gap-3">
            {messages.map((message: any) => (
              <InboxRowItem
                key={`inbox-row-${message._id}`}
                message={message}
                onClick={(id: string) => setMessageId(id)}
              />
            ))}
          </div>
        )}

        <TablePagination
          totalItems={totalMessageCount}
          onChange={handlePageChange}
        />
      </div>
      <Drawer
        direction="right"
        open={Boolean(messageId)}
        onClose={() => {
          setMessageId("");
        }}
      >
        <DrawerTrigger />
        <DrawerContent>
          {selectedMessage && (
            <InboxDetails
              message={selectedMessage}
              onClose={() => setMessageId("")}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InboxPage;
