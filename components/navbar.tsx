"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Account } from "@/components/account/account"
import { Logo } from "@/components/logo"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NAV_ROUTES } from "@/features/routes/constants"
import { cn } from "@/lib/utils"

import { Close } from "./icons/close"
import { Hamburger } from "./icons/hamburger"

export const Navbar = () => {
  const path = usePathname()
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)

  return (
    <div className="lg:mx[108px] fixed top-0 z-20 flex h-[72px] w-full items-center border-b bg-primary px-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <div className="flex items-center gap-14">
          <Logo />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              {NAV_ROUTES.map((nav) => (
                <NavigationMenuItem key={nav.href}>
                  <Link
                    href={nav.href}
                    className={cn(
                      navigationMenuTriggerStyle({
                        className:
                          "h-[72px] rounded-none border-b-2 border-transparent font-semibold !text-secondary-foreground hover:border-secondary-foreground hover:bg-transparent",
                      }),
                      {
                        "border-foreground !text-foreground": path.startsWith(
                          nav.href
                        ),
                      }
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {nav.icon}
                      {nav.title}
                    </div>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Account />

          <div
            className="relative flex h-6 w-6 cursor-pointer items-center justify-center transition-all hover:opacity-70 md:hidden"
            onClick={() => setIsMenuOpened((prev) => !prev)}
          >
            {!isMenuOpened ? <Hamburger /> : <Close />}
          </div>
        </div>
      </div>

      {isMenuOpened && (
        <div className="fixed bottom-0 left-0 right-0 top-[72px] bg-primary">
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="px-2" orientation="vertical">
              {NAV_ROUTES.map((nav) => (
                <NavigationMenuItem key={nav.href}>
                  <Link
                    href={nav.href}
                    className={cn(
                      navigationMenuTriggerStyle({
                        className:
                          "h-auto w-full justify-start rounded-none border-transparent py-4 font-semibold !text-secondary-foreground",
                      }),
                      {
                        "border-foreground !text-foreground": path.startsWith(
                          nav.href
                        ),
                      }
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {nav.icon}
                      {nav.title}
                    </div>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  )
}
