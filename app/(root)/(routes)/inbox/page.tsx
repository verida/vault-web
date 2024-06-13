"use client";

import { Filter } from "@/components/icons/filter";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/table-pagination";
import { useInbox } from "@/features/inbox/hooks";
import { useInboxContext } from "@/features/inbox/hooks/useInboxContext";
import { useMessages } from "@/features/inbox/hooks/useMessages";
import { usePagination } from "@/hooks/usePagination";
import Image from "next/image";

import NoInboxImage from "@/assets/no-inbox.svg";
import ErrorInboxImage from "@/assets/error-inbox.svg";
import { InboxRowItem } from "@/components/inbox/InboxRowItem";
import { useMemo } from "react";
import { Spinner } from "@/components/spinner";

const InboxPage = () => {
  const { messagingEngine } = useInboxContext();
  const { page, offset, limit } = usePagination();
  const { unreadMessageCount, totalMessageCount, isTotalMessageCountPending, isUnreadMessageCountPending } = useInbox();
  const { messages, isMessagesPending, isMessagesError } = useMessages(messagingEngine, {}, offset, limit);

  console.log(messages);

  const isLoading = useMemo(() => {
    return isTotalMessageCountPending || isUnreadMessageCountPending || isMessagesPending;
  }, [isTotalMessageCountPending, isUnreadMessageCountPending, isMessagesPending]);

  const handleSearchInputChange = (value: string) => {};

  return (
    <div className='flex flex-col pt-10 pb-6 gap-6 flex-grow'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Inbox</h1>
        <nav className='flex space-x-3 w-full md:w-auto'>
          <SearchInput onValueChange={handleSearchInputChange} />
          <Button variant='outline' size='lg' className='text-gray-500 h-12 px-4 space-x-2'>
            <Filter /> <span>Filter</span>
          </Button>
        </nav>
      </div>

      {isLoading && <LoadingInbox />}

      <div className='flex-grow flex flex-col items-center gap-3'>
        {messages &&
          messages.map((message: any) => <InboxRowItem key={`inbox-row-${message._id}`} message={message} />)}
      </div>

      <TablePagination />
    </div>
  );
};

export default InboxPage;

const NoInbox = () => {
  return (
    <>
      <Image src={NoInboxImage} width={100} height={140} alt='no-inbox' className='h-[105px] md:h-[140px]' />
      <div className='text-center mt-8 space-y-2'>
        <h4 className='text-xl font-semibold'>Nothing in Your Inbox Yet</h4>
        <p className='text-gray-500'>When new messages arrive, they&apos;ll show up here.</p>
      </div>
    </>
  );
};

const LoadingInbox = () => {
  return (
    <div className='flex-grow flex flex-col justify-center items-center gap-3'>
      <Spinner />
      <div className='text-center mt-8 space-y-2'>
        <h4 className='text-xl font-semibold'>Please wait...</h4>
        <p className='text-gray-500'>We&apos;are fetching your latest messages.</p>
      </div>
    </div>
  );
};

const InboxError = () => {
  return (
    <div className='text-center gap-6 flex flex-col items-center justify-center'>
      <Image src={ErrorInboxImage} width={121} height={140} alt='error' className='h-[105px] md:h-[140px]' />
      <h4 className='text-xl font-semibold'>There was an error getting your inbox, Please try again.</h4>
      <Button variant='outline'>Reload</Button>
    </div>
  );
};
