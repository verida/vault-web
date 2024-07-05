"use client";

import { useMemo, useState } from "react";

import { FilterButton } from "@/components/filter-button";
import { InboxRowItem } from "@/components/inbox/inbox-item";
import { InboxError } from "@/components/inbox/status/inbox-error";
import { LoadingInbox } from "@/components/inbox/status/inbox-loading";
import { NoInbox } from "@/components/inbox/status/no-inbox";
import { SearchInput } from "@/components/search-input";
import { Typography } from "@/components/typography";
import { TablePagination } from "@/components/ui/table-pagination";
import { useInbox } from "@/features/inbox/hooks";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";

const InboxPage = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const { messagingEngine } = useInboxContext();
  const {
    totalMessageCount,
    isTotalMessageCountPending,
    isUnreadMessageCountPending,
    isTotalMessageCountError,
    isUnreadMessageCountError,
  } = useInbox();
  const { messages, isMessagesPending } = useMessages(
    messagingEngine,
    {},
    offset,
    limit
  );

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

  const hasError = useMemo(() => {
    return isTotalMessageCountError || isUnreadMessageCountError;
  }, [isTotalMessageCountError, isUnreadMessageCountError]);

  const handleSearchInputChange = (value: string) => {};

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return (
    <>
      <div className="flex flex-grow flex-col space-y-6 pb-6 pt-10">
        <div className="flex items-center justify-between">
          <Typography variant="heading-3">Inbox</Typography>
          <nav className="flex space-x-2 md:w-auto md:space-x-3">
            {/* <SearchInput
              onValueChange={handleSearchInputChange}
              className="md:flex-grow"
            />
            <FilterButton /> */}
          </nav>
        </div>

        {isLoading && <LoadingInbox />}

        {hasError && <InboxError />}

        {!isLoading && totalMessageCount === 0 && <NoInbox />}

        {!isLoading && messages && (
          <div className="flex flex-grow flex-col items-center gap-3">
            {messages.map((message: any) => (
              <InboxRowItem
                key={`inbox-row-${message._id}`}
                message={message}
                href={`/inbox/${message._id}`}
              />
            ))}
          </div>
        )}

        <TablePagination
          totalItems={totalMessageCount}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default InboxPage;
