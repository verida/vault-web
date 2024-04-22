"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Account } from "@/components/account/account";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Data } from "@/components/icons/data";
import { Connection } from "@/components/icons/connection";
import { Nft } from "@/components/icons/nft";
import { Inbox } from "@/components/icons/inbox";

import { Refer } from "@/components/icons/refer";

export const Navbar = () => {
  const path = usePathname();

  return (
    <div className='fixed top-0 w-full h-[72px] lg:mx[108px] px-4 border-b shadow-sm bg-white flex items-center z-20'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href='/data'
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "rounded-none h-[72px] border-b-2 border-transparent",
                  }),
                  {
                    "border-gray-800 text-primary": path.startsWith("/data"),
                  }
                )}
              >
                <div className='flex items-center gap-2 p-4'>
                  <Data className='text-gray-500' /> Data
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/connections'
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "rounded-none h-[72px] border-b-2 border-transparent",
                  }),
                  {
                    "border-gray-800 text-primary":
                      path.startsWith("/connections"),
                  }
                )}
              >
                <div className='flex items-center gap-2 p-4'>
                  <Connection />
                  Connections
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/nfts'
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "rounded-none h-[72px] border-b-2 border-transparent",
                  }),
                  {
                    "border-gray-800 text-primary": path.startsWith("/nfts"),
                  }
                )}
              >
                <div className='flex items-center gap-2 p-4'>
                  <Nft />
                  NFTs
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/inbox'
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "rounded-none h-[72px] border-b-2 border-transparent",
                  }),
                  {
                    "border-gray-800 text-primary": path.startsWith("/inbox"),
                  }
                )}
              >
                <div className='flex items-center gap-2 p-4'>
                  <Inbox />
                  Inbox
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/referfriend'
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "rounded-none h-[72px] border-b-2 border-transparent",
                  }),
                  {
                    "border-gray-800 text-primary":
                      path.startsWith("/referfriend"),
                  }
                )}
              >
                <div className='flex items-center gap-2 p-4'>
                  <Refer />
                  Refer a friend
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Account />
      </div>
    </div>
  );
};
