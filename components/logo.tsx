import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 md:flex'>
        <Image src='/logo.svg' alt='Logo' height={32} width={95} />
      </div>
    </Link>
  );
};
