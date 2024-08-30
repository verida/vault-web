"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NAV_ROUTES } from "@/features/routes/constants"
import { cn } from "@/styles/utils"

export type AppHeaderNavBarProps = Pick<
  React.ComponentProps<typeof NavigationMenu>,
  "className"
>

export function AppHeaderNavBar(props: AppHeaderNavBarProps) {
  const { className } = props
  const path = usePathname()

  return (
    <NavigationMenu className={cn("items-stretch", className)}>
      <NavigationMenuList className="h-full">
        {NAV_ROUTES.map((nav) => (
          <NavigationMenuItem key={nav.href}>
            <Link
              href={nav.href}
              className={cn(
                navigationMenuTriggerStyle({
                  className:
                    "h-full rounded-none border-b-2 font-semibold hover:border-secondary-foreground hover:text-secondary-foreground",
                }),
                path.startsWith(nav.href)
                  ? "border-foreground !text-foreground"
                  : "border-transparent !text-secondary-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {nav.icon}
                {nav.label}
              </div>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function AppHeaderNavMenu() {
  const path = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 top-[calc(4rem_+_1px)] bg-primary md:top-[calc(5rem_+_3px)]">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="px-2" orientation="vertical">
          {NAV_ROUTES.map((nav) => (
            <NavigationMenuItem key={nav.href}>
              <Link
                href={nav.href}
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "h-auto w-full justify-start rounded-none py-4 font-semibold",
                  }),
                  path.startsWith(nav.href)
                    ? "border-foreground !text-foreground"
                    : "border-transparent !text-secondary-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  {nav.icon}
                  {nav.label}
                </div>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
