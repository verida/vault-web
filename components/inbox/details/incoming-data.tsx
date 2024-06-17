import React from "react";
import { InboxDetailsProps } from "../inbox-details";
import { Button } from "@/components/ui/button";
import { Warning } from "@/components/icons/warning";

const InboxIncomingData: React.FC<InboxDetailsProps> = ({ message }) => {
  const { message: title, data } = message;
  return (
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
            <div className='bg-[#F6F7F9] rounded border-l-2 border-yellow-500 p-2 mb-3'>
              <div className='flex gap-2 items-center'>
                <Warning />
                <p className='text-sm'>Ignore if you don’t recognize this request</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <Button variant='outline' className='w-full h-12 font-semibold'>
                Decline
              </Button>
              <Button variant='default' disabled className='w-full h-12 bg-purple-500 font-semibold hover:bg-purple-600'>
                Accept
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InboxIncomingData;
