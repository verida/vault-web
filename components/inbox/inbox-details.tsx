import { ReactElement, ReactNode, useMemo } from "react";
import { InboxEntry, InboxType } from "@/features/inbox/types";
import { InboxMessageDetails } from "./details/message";
import InboxIncomingData from "./details/incoming-data";
import { Success } from "@/components/icons/success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
export interface InboxDetailsProps {
  message: InboxEntry;
}

export const InboxDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  const DetailsComponent = useMemo((): ReactElement => {
    switch (message.type) {
      case InboxType.DATASTORE_SYNC:
      case InboxType.DATA_REQUEST:
        return <InboxMessageDetails message={message} />;
      case InboxType.DATA_SEND:
        return <InboxIncomingData message={message} />;
      default:
        return <InboxMessageDetails message={message} />;
    }
  }, [message]);

  return (
    <>
      <div className='flex items-center space-x-1 px-6'>
        <div className='relative'>
          <Avatar className='shadow'>
            {message.sentBy?.avatar?.uri && (
              <AvatarImage src={message.sentBy?.avatar?.uri} asChild>
                <Image src={message.sentBy?.avatar?.uri} width={48} height={48} alt='' />
              </AvatarImage>
            )}
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
        </div>
        <div>
          <p className='text-[#041133] font-medium'>{message.sentBy?.name}</p>
        </div>
      </div>
      {DetailsComponent}
    </>
  );
};
