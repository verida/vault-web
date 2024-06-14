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
import { Inbox } from "@/components/icons/inbox";
import { useState } from "react";
import { Close } from "./icons/close";
import { Hamburger } from "./icons/hamburger";

const headerNavs = [
  {
    icon: <Inbox />,
    title: "Inbox",
    href: "/inbox",
  },
  {
    icon: <Data />,
    title: "Data",
    href: "/data",
  },
  {
    icon: <Connection />,
    title: "Connections",
    href: "/connections",
  },
];
export const Navbar = () => {
  const path = usePathname();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  return (
    <div className='fixed top-0 w-full h-[72px] lg:mx[108px] px-4 border-b bg-white flex items-center z-20'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <div className='flex items-center gap-14'>
          <Logo />
          <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList className='space-x-2'>
              {headerNavs.map((nav) => (
                <NavigationMenuItem key={`nav-menu-item-${nav.title}`}>
                  <NavigationMenuLink
                    href={nav.href}
                    className={cn(
                      navigationMenuTriggerStyle({
                        className: "rounded-none h-[72px] border-b-2 border-transparent font-semibold !text-gray-500",
                      }),
                      {
                        "border-gray-800 !text-primary": path.startsWith(nav.href),
                      }
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      {nav.icon}
                      {nav.title}
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='flex items-center gap-4'>
          <Account />

          <div
            className='relative cursor-pointer transition-all hover:opacity-70 md:hidden w-6 h-6 flex justify-center items-center'
            onClick={() => setIsMenuOpened((prev) => !prev)}
          >
            {!isMenuOpened ? <Hamburger /> : <Close />}
          </div>
        </div>
      </div>

      {isMenuOpened && (
        <div className='fixed left-0 right-0 top-[72px] bottom-12 bg-background'>
          <NavigationMenu orientation='vertical'>
            <NavigationMenuList className='px-2' orientation='vertical'>
              {headerNavs.map((nav) => (
                <NavigationMenuItem key={`nav-menu-item-${nav.title}`}>
                  <NavigationMenuLink
                    href={nav.href}
                    className={cn(
                      navigationMenuTriggerStyle({
                        className:
                          "rounded-none border-transparent font-semibold !text-gray-500 py-4 h-auto w-full justify-start",
                      }),
                      {
                        "border-gray-800 !text-primary": path.startsWith(nav.href),
                      }
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      {nav.icon}
                      {nav.title}
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};
