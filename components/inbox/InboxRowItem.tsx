import Image from "next/image";
import { InboxIncoming } from "../icons/inbox-incoming";
import { Success } from "../icons/success";

import BinanceImage from "@/assets/binance.svg";
import { InboxEntry, InboxType } from "@/features/inbox/types";
import { cn, formatDate } from "@/lib/utils";
import { InboxMessage } from "../icons/inbox-message";
import { InboxData } from "../icons/inbox-data";

interface InboxRowItemProps {
  message: InboxEntry;
}

export const InboxRowItem: React.FC<InboxRowItemProps> = ({ message }) => {
  return (
    <div className='border border-gray-200 rounded-lg bg-background text-sm w-full grid grid-cols-[1fr_1fr_1fr_160px] min-h-[72px]'>
      <div className='px-4 flex items-center gap-3 shrink'>
        <span className={cn("size-2 rounded-full bg-purple-500", message.read ? "opacity-0" : "opacity-100")}></span>
        <div className='relative'>
          <Image src={BinanceImage} width={48} height={48} alt='' />
          <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
        </div>
        <p className='font-semibold text-neutral-600'>Binance</p>
      </div>
      <div className='flex items-center px-4 gap-4 shrink'>
        <div className='flex gap-2'>
          {message.type === InboxType.MESSAGE && (
            <>
              <InboxMessage /> <p className='font-semibold'>Message</p>
            </>
          )}
          {message.type === InboxType.DATASTORE_SYNC && (
            <>
              <InboxMessage /> <p className='font-semibold'>Message</p>
            </>
          )}
          {message.type === InboxType.DATA_REQUEST && (
            <>
              <InboxData /> <p className='font-semibold'>Data Request</p>
            </>
          )}
          {message.type === InboxType.DATA_SEND && (
            <>
              <InboxIncoming /> <p className='font-semibold'>Incoming Data</p>
            </>
          )}
        </div>
        <div className='flex gap-2'>
          <Success />
          <p className='font-semibold'>Accepted</p>
        </div>
      </div>
      <p className='font-semibold px-4 flex items-center whitespace-nowrap overflow-hidden text-ellipsis'>
        {message.message}
      </p>
      <p className='text-gray-500 px-4 flex items-center'>{formatDate(message.sentAt)}</p>
    </div>
  );
};
