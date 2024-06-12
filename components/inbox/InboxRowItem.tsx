import Image from "next/image";
import { InboxIncoming } from "../icons/inbox-incoming";
import { Success } from "../icons/success";

import BinanceImage from "@/assets/binance.svg";

export const InboxRowItem = () => {
  return (
    <div className='border border-gray-200 rounded-lg bg-background text-sm w-full grid grid-cols-[1fr_1fr_1fr_160px] min-h-[72px]'>
      <div className='px-4 flex items-center gap-3'>
        <span className='size-2 rounded-full bg-purple-500'></span>
        <div className='relative'>
          <Image src={BinanceImage} width={48} height={48} alt='' />
          <Success className='absolute border border-white right-0 bottom-0 rounded-full size-4' />
        </div>
        <p className='font-semibold text-neutral-600'>Binance</p>
      </div>
      <div className='flex items-center px-4 gap-4'>
        <div className='flex gap-2'>
          <InboxIncoming />
          <p className='font-semibold'>Incoming data</p>
        </div>
        <div className='flex gap-2'>
          <Success />
          <p className='font-semibold'>Accepted</p>
        </div>
      </div>
      <p className='font-semibold px-4 flex items-center'>New KYC credential</p>
      <p className='text-gray-500 px-4 flex items-center'>1 min ago</p>
    </div>
  );
};
