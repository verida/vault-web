import React from "react";
import { InboxDetailsProps } from "../inbox-details";
import { Button } from "@/components/ui/button";
import { DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Success } from "@/components/icons/success";
import Image from "next/image";
import Alert from "@/components/alert";
import { useInboxAction } from "@/features/inbox/hooks/useInboxAction";
import { InboxType } from "@/features/inbox/types";
import { Failed } from "@/components/icons/failed";
import { IncomingDataItem } from "../incoming-data-item";

const InboxIncomingData: React.FC<InboxDetailsProps> = ({ message, onClose }) => {
  const { message: title, data } = message;

  const { handleAccept, handleReject, isLoading } = useInboxAction();

  return (
    <>
      <DrawerHeader className='flex items-center justify-between space-x-3'>
        <div className='flex items-center space-x-3'>
          <CloseSideRight />
          <DrawerTitle>Incoming Data</DrawerTitle>
        </div>
        {data.status === "accept" && (
          <div className='flex gap-2 items-center'>
            <Success />
            <p className='font-semibold text-sm'>Accepted</p>
          </div>
        )}
        {data.status === "decline" && (
          <div className='flex gap-2 items-center'>
            <Failed />
            <p className='font-semibold text-sm'>Declined</p>
          </div>
        )}
      </DrawerHeader>

      <div className='p-6 overflow-y-auto'>
        <div className='flex items-center space-x-2'>
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
            <p className='text-xs text-neutral-500'>Today at 5:40 pm</p>
          </div>
        </div>

        <div className='rounded-lg bg-purple-50 p-4 mt-6'>
          <h5 className='text-[#041133] font-semibold text-sm'>{title}</h5>
        </div>

        <p className='text-sm text-neutral-500 mt-8'>Incoming data item</p>

        <div className='mt-3 space-y-3'>
          {data.data &&
            data.data.map((item: any, _ind: number) => (
              <IncomingDataItem item={item} key={`incoming-item-${item._id}`} />
            ))}
        </div>
      </div>

      <DrawerFooter>
        {data.status ? (
          <Button
            variant='default'
            className='w-full h-12 bg-purple-500 hover:bg-purple-600 font-semibold'
            onClick={onClose}
          >
            Close
          </Button>
        ) : (
          <>
            <Alert text='Ignore if you don’t recognize this request' />
            <div className='flex gap-4'>
              <Button
                variant='outline'
                className='w-full h-12 font-semibold'
                onClick={() => handleReject(message, InboxType.DATA_SEND, {})}
                disabled={isLoading}
              >
                Decline
              </Button>
              <Button
                className='w-full h-12 bg-purple-500 font-semibold hover:bg-purple-600'
                onClick={() => handleAccept(message, InboxType.DATA_SEND, {})}
                disabled={isLoading}
              >
                Accept
              </Button>
            </div>
          </>
        )}
      </DrawerFooter>
    </>
  );
};

export default InboxIncomingData;
