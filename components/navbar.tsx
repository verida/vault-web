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

  return (
    <div className='fixed top-0 w-full h-[72px] lg:mx[108px] px-4 border-b shadow-sm bg-white flex items-center z-20'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <div className='flex items-center gap-14'>
          <Logo />
          <NavigationMenu className='hidden md:block'>
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
        <Account />
      </div>
    </div>
  );
};
