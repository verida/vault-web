"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback } from "react"

import { AiAssistantIcon } from "@/components/icons/ai-assistant-icon"
import { Connection } from "@/components/icons/connection"
import { Data } from "@/components/icons/data"
import { InboxWithBadge } from "@/components/icons/inbox-with-badge"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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
        <NavigationMenuItem>
          <Link
            href={getDataPageRoute()}
            data-active={path.startsWith(getDataPageRoute()) ? true : undefined}
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
export type AppHeaderNavMenuProps = {
  onNavItemClick?: () => void
}

export function AppHeaderNavMenu(props: AppHeaderNavMenuProps) {
  const { onNavItemClick } = props

  const path = usePathname()

  const handleClick = useCallback(() => {
    onNavItemClick?.()
  }, [onNavItemClick])

  return (
    <div className="fixed bottom-0 left-0 right-0 top-[calc(4rem_+_1px)] bg-surface md:top-[calc(5rem_+_3px)]">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="px-2" orientation="vertical">
          {featureFlags.assistant.enabled ? (
            <NavigationMenuItem>
              <Link
                href={getAssistantPageRoute()}
                onClick={handleClick}
                data-active={
                  path.startsWith(getAssistantPageRoute()) ? true : undefined
                }
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted data-[active]:text-violet-600",
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
          <NavigationMenuItem>
            <Link
              href={getInboxPageRoute()}
              onClick={handleClick}
              data-active={
                path.startsWith(getInboxPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className:
                    "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <InboxWithBadge />
                <span>Inbox</span>
              </div>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={getDataPageRoute()}
              onClick={handleClick}
              data-active={
                path.startsWith(getDataPageRoute()) ? true : undefined
              }
              className={cn(
                navigationMenuTriggerStyle({
                  className:
                    "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted",
                })
              )}
            >
              <div className="flex items-center gap-2">
                <Data />
                <span>Data</span>
              </div>
            </Link>
          </NavigationMenuItem>
          {featureFlags.dataConnections.enabled ? (
            <NavigationMenuItem>
              <Link
                href={getConnectionsSummaryPageRoute()}
                onClick={handleClick}
                data-active={
                  path.startsWith(getConnectionsPageRoute()) ? true : undefined
                }
                className={cn(
                  navigationMenuTriggerStyle({
                    className:
                      "h-auto w-full justify-start py-4 font-semibold data-[active]:bg-muted",
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
    </div>
  )
}
