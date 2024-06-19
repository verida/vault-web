import { isEmpty } from "lodash";
import { InboxDetailsProps } from "../inbox-details";
import { DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CloseSideRight } from "@/components/icons/close-side-right";
import { InboxType } from "@/features/inbox/types";
import { Success } from "@/components/icons/success";
import { Failed } from "@/components/icons/failed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const InboxMessageDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  const { message: title, data } = message;
  const itemData = !isEmpty(data.data) ? data.data[0] : null;

  return (
    <>
      <DrawerHeader className='flex items-center justify-between space-x-3'>
        <div className='flex items-center space-x-3'>
          <CloseSideRight />
          <DrawerTitle>Message</DrawerTitle>
        </div>
      </DrawerHeader>
      <div className='py-6 h-full overflow-y-auto'>
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

        <div className='rounded-lg bg-[#f5f4ff] m-6 p-4'>
          <h5 className='text-[#041133] font-semibold'>{title}</h5>
          <p className='text-sm'>{itemData.message}</p>
        </div>
      </div>

      <DrawerFooter>{!!itemData.link && <Button onClick={() => {}}>{itemData.link.text}</Button>}</DrawerFooter>
    </>
  );
};
