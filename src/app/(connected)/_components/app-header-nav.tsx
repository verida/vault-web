"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback, useState } from "react"

import { AiAssistantIcon } from "@/components/icons/ai-assistant-icon"
import { Close as CloseIcon } from "@/components/icons/close"
import { Connection } from "@/components/icons/connection"
import { Data } from "@/components/icons/data"
import { Hamburger as MenuIcon } from "@/components/icons/hamburger"
import { InboxWithBadge } from "@/components/icons/inbox-with-badge"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { featureFlags } from "@/config/features"
import {
  getAssistantPageRoute,
  getConnectionsPageRoute,
  getConnectionsSummaryPageRoute,
  getDataPageRoute,
  getInboxPageRoute,
} from "@/features/routes/utils"
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
        {featureFlags.assistant.enabled ? (
          <NavigationMenuItem>
            <Link
              href={getAssistantPageRoute()}
              data-active={
                path.startsWith(getAssistantPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className:
                    "h-full rounded-none border-b-2 font-semibold data-[active]:text-violet-600",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <AiAssistantIcon className="text-ai-assistant-gradient" />
                <span className="bg-ai-assistant-gradient bg-clip-text text-transparent">
                  AI Assistant
                </span>
              </div>
            </Link>
          </NavigationMenuItem>
        ) : null}
        {featureFlags.inbox.enabled ? (
          <NavigationMenuItem>
            <Link
              href={getInboxPageRoute()}
              data-active={
                path.startsWith(getInboxPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className: "h-full rounded-none border-b-2 font-semibold",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <InboxWithBadge />
                <span>Inbox</span>
              </div>
            </Link>
          </NavigationMenuItem>
        ) : null}
        {featureFlags.data.enabled ? (
          <NavigationMenuItem>
            <Link
              href={getDataPageRoute()}
              data-active={
                path.startsWith(getDataPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className: "h-full rounded-none border-b-2 font-semibold",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <Data />
                <span>Data</span>
              </div>
            </Link>
          </NavigationMenuItem>
        ) : null}
        {featureFlags.dataConnections.enabled ? (
          <NavigationMenuItem>
            <Link
              href={getConnectionsSummaryPageRoute()}
              data-active={
                path.startsWith(getConnectionsPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className: "h-full rounded-none border-b-2 font-semibold",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <Connection />
                <span>Connections</span>
              </div>
            </Link>
          </NavigationMenuItem>
        ) : null}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function AppHeaderNavMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setIsOpen(isOpen)
  }, [])

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClickItem = useCallback(() => {
    setIsOpen(false)
  }, [])

  const path = usePathname()

  return (
    <Popover modal open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild className="group">
        <Button variant="ghost" className="h-auto px-2" onClick={toggleIsOpen}>
          <div className="hidden group-data-[state=open]:block">
            <CloseIcon className="size-6" />
            <span className="sr-only">Close navigation menu</span>
          </div>
          <div className="hidden group-data-[state=closed]:block">
            <MenuIcon className="size-6" />
            <span className="sr-only">Open navigation menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={17}
        className="h-[calc(100dvh_-_73px)] w-screen rounded-none border-0 shadow-none"
      >
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="px-2" orientation="vertical">
            {featureFlags.assistant.enabled ? (
              <NavigationMenuItem>
                <Link
                  href={getAssistantPageRoute()}
                  onClick={handleClickItem}
                  data-active={
                    path.startsWith(getAssistantPageRoute()) ? true : undefined
                  }
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted/50 data-[active]:text-violet-600 data-[active]:hover:bg-muted data-[active]:focus:bg-muted",
                    })
                  )}
                >
                  <div className="flex items-center gap-2">
                    <AiAssistantIcon />
                    <span className="bg-ai-assistant-gradient bg-clip-text text-transparent">
                      AI Assistant
                    </span>
                  </div>
                </Link>
              </NavigationMenuItem>
            ) : null}
            {featureFlags.inbox.enabled ? (
              <NavigationMenuItem>
                <Link
                  href={getInboxPageRoute()}
                  onClick={handleClickItem}
                  data-active={
                    path.startsWith(getInboxPageRoute()) ? true : undefined
                  }
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted/50 data-[active]:hover:bg-muted data-[active]:focus:bg-muted",
                    })
                  )}
                >
                  <div className="flex items-center gap-2">
                    <InboxWithBadge />
                    <span>Inbox</span>
                  </div>
                </Link>
              </NavigationMenuItem>
            ) : null}
            {featureFlags.data.enabled ? (
              <NavigationMenuItem>
                <Link
                  href={getDataPageRoute()}
                  onClick={handleClickItem}
                  data-active={
                    path.startsWith(getDataPageRoute()) ? true : undefined
                  }
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted/50 data-[active]:hover:bg-muted data-[active]:focus:bg-muted",
                    })
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Data />
                    <span>Data</span>
                  </div>
                </Link>
              </NavigationMenuItem>
            ) : null}
            {featureFlags.dataConnections.enabled ? (
              <NavigationMenuItem>
                <Link
                  href={getConnectionsSummaryPageRoute()}
                  onClick={handleClickItem}
                  data-active={
                    path.startsWith(getConnectionsPageRoute())
                      ? true
                      : undefined
                  }
                  className={cn(
                    navigationMenuTriggerStyle({
                      className:
                        "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted/50 data-[active]:hover:bg-muted data-[active]:focus:bg-muted",
                    })
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Connection />
                    <span>Connections</span>
                  </div>
                </Link>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  )
}
