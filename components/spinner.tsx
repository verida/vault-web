import NoInboxImage from "@/assets/spinner.svg";
import Image from "next/image";

export const Spinner = () => {
  return <Image src={NoInboxImage} width={100} height={140} alt='no-inbox' className='h-[105px] md:h-[140px]' />;
};
