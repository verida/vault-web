import React from "react";
import { InboxDetailsProps } from "../inbox-details";
import { Button } from "@/components/ui/button";
import { Warning } from "@/components/icons/warning";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Success } from "@/components/icons/success";
import Image from "next/image";
import Alert from "@/components/alert";

const InboxIncomingData: React.FC<InboxDetailsProps> = ({ message }) => {
  const { message: title, data } = message;
  return (
    <>
      <DrawerHeader className='flex items-center justify-between space-x-3'>
        <div className='flex items-center space-x-3'>
          <CloseSideRight />
          <DrawerTitle>Incoming Data</DrawerTitle>
        </div>
      </DrawerHeader>

      <div className='py-6 h-full'>
        <div className='flex items-center space-x-2 px-6'>
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

        <div className='flex flex-col justify-between h-full'>
          <div className='rounded-lg bg-[#f5f4ff] m-6 p-4'>
            <h5 className='text-[#041133] font-semibold'>{title}</h5>
          </div>
          <div className='border-t border-gray-200 p-6 mb-4'>
            {data.status ? (
              <Button variant='default' className='w-full h-12 bg-purple-500 hover:bg-purple-600 font-semibold'>
                Close
              </Button>
            ) : (
              <>
                <Alert text='Ignore if you don’t recognize this request' />
                <div className='flex gap-4'>
                  <Button variant='outline' className='w-full h-12 font-semibold'>
                    Decline
                  </Button>
                  <Button
                    variant='default'
                    disabled
                    className='w-full h-12 bg-purple-500 font-semibold hover:bg-purple-600'
                  >
                    Accept
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InboxIncomingData;
