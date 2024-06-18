import Image from "next/image";
import { Success } from "../icons/success";

import BinanceImage from "@/assets/binance.svg";
import { InboxEntry } from "@/features/inbox/types";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { inboxTypes } from "@/features/inbox/constants";

interface InboxRowItemProps {
  message: InboxEntry;
  onClick: (_id: string) => void;
}

export const InboxRowItem: React.FC<InboxRowItemProps> = ({ message, onClick }) => {
  const { _id, message: title, read, sentAt, sentBy, type, data } = message;
  const InboxTypeIcon = inboxTypes[type].icon;

  return (
    <Card className='flex rounded-lg w-full' onClick={() => onClick(_id)}>
      {/* desktop card */}
      <div className='text-sm w-full hidden md:grid grid-cols-[1fr_1fr_1fr_160px] min-h-[72px]'>
        <div className='px-4 flex items-center gap-3 shrink'>
          <span className={cn("size-2 rounded-full bg-purple-500", read ? "opacity-0" : "opacity-100")}></span>
          <div className='relative'>
            <Avatar>
              {sentBy.avatar?.uri && (
                <AvatarImage src={sentBy.avatar?.uri} asChild>
                  <Image src={sentBy.avatar?.uri} width={48} height={48} alt='' />
                </AvatarImage>
              )}
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
          </div>
          <p className='font-semibold text-neutral-600'>{sentBy.name}</p>
        </div>
        <div className='flex items-center px-4 gap-4 shrink'>
          <div className='flex gap-2 items-center'>
            <InboxTypeIcon />
            <p className='font-semibold text-sm'>{inboxTypes[type].text}</p>
          </div>

          {data.status === "accept" && (
            <div className='flex gap-2 items-center'>
              <Success />
              <p className='font-semibold text-sm'>Accepted</p>
            </div>
          )}
        </div>
        <p className='font-semibold px-4 flex items-center whitespace-nowrap overflow-hidden text-ellipsis'>{title}</p>
        <p className='text-gray-500 px-4 flex items-center'>{formatDate(sentAt)}</p>
      </div>

      {/* mobile card */}
      <div className='flex md:hidden p-4 space-x-3 items-start w-full'>
        <div className='relative'>
          <Avatar>
            {sentBy.avatar?.uri && (
              <AvatarImage src={sentBy.avatar?.uri} asChild>
                <Image src={sentBy.avatar?.uri} width={48} height={48} alt='' />
              </AvatarImage>
            )}
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
        </div>
        <div className='space-y-[6px] flex-grow'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-neutral-600'>{sentBy.name}</p>
            <p className='text-[13px] font-semibold opacity-60'>15:40</p>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center '>
              <InboxTypeIcon className='w-4 h-4' />
              <p className='font-semibold text-xs'>{inboxTypes[type].text}</p>
            </div>
            <span className={cn("size-2 rounded-full bg-purple-500", read ? "opacity-0" : "opacity-100")}></span>
          </div>
          <p className='text-sm line-clamp-1 font-semibold'>{title}</p>
        </div>
      </div>
    </Card>
  );
};
