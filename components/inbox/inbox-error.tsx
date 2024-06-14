import Image from "next/image";
import { Button } from "@/components/ui/button";

import ErrorInboxImage from "@/assets/error-inbox.svg";

export const InboxError = () => {
  return (
    <div className='text-center gap-6 flex flex-col items-center justify-center'>
      <Image src={ErrorInboxImage} width={121} height={140} alt='error' className='h-[105px] md:h-[140px]' />
      <h4 className='text-xl font-semibold'>There was an error getting your inbox, Please try again.</h4>
      <Button variant='outline'>Reload</Button>
    </div>
  );
};
