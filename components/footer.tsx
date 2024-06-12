import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full p-4 lg:mx[108px]'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-xs text-gray-500'>© 2024 Verida Vault</p>
          <Link href='/terms' className='text-xs text-gray-500'>
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};
