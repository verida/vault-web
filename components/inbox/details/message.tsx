import { Success } from "@/components/icons/success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { InboxDetailsProps } from "../inbox-details";

export const InboxMessageDetails: React.FC<InboxDetailsProps> = ({ message }) => {
  const { sentBy, message: title } = message;
  return (
    <>
      <div className='flex items-center space-x-1'>
        <div className='relative'>
          <Avatar className='shadow'>
            {sentBy?.avatar?.uri && (
              <AvatarImage src={sentBy?.avatar?.uri} asChild>
                <Image src={sentBy?.avatar?.uri} width={48} height={48} alt='' />
              </AvatarImage>
            )}
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
        </div>
        <div>
          <p className='text-[#041133] font-medium'>{sentBy?.name}</p>
        </div>
      </div>

      <div className='rounded-lg bg-[#f5f4ff] p-4'>
        <h5 className='text-[#041133] font-semibold'>{title}</h5>
      </div>
    </>
  );
};
