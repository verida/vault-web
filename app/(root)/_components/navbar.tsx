"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Account } from "@/components/account/account";
import { Connection } from "@/components/icons/connection";
import { Data } from "@/components/icons/data";
import { Inbox } from "@/components/icons/inbox";
import { Nft } from "@/components/icons/nft";
import { Refer } from "@/components/icons/refer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const path = usePathname();

  return (
    <div className="lg:mx[108px] fixed top-0 flex h-[72px] w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/data">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-[72px] rounded-none border-b-2 border-transparent",
                    }),
                    {
                      "border-gray-800 text-primary": path.startsWith("/data"),
                    }
                  )}
                >
                  <div className="flex items-center gap-2 p-4">
                    <Data className="text-gray-500" /> Data
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/connections">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-[72px] rounded-none border-b-2 border-transparent",
                    }),
                    {
                      "border-gray-800 text-primary":
                        path.startsWith("/connections"),
                    }
                  )}
                >
                  <div className="flex items-center gap-2 p-4">
                    <Connection />
                    Connections
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/nfts">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-[72px] rounded-none border-b-2 border-transparent",
                    }),
                    {
                      "border-gray-800 text-primary": path.startsWith("/nfts"),
                    }
                  )}
                >
                  <div className="flex items-center gap-2 p-4">
                    <Nft />
                    NFTs
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/inbox">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-[72px] rounded-none border-b-2 border-transparent",
                    }),
                    {
                      "border-gray-800 text-primary": path.startsWith("/inbox"),
                    }
                  )}
                >
                  <div className="flex items-center gap-2 p-4">
                    <Inbox />
                    Inbox
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/referfriend">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-[72px] rounded-none border-b-2 border-transparent",
                    }),
                    {
                      "border-gray-800 text-primary":
                        path.startsWith("/referfriend"),
                    }
                  )}
                >
                  <div className="flex items-center gap-2 p-4">
                    <Refer />
                    Refer a friend
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Account />
      </div>
    </div>
  );
};
