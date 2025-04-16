"use client"

import { type ComponentProps, useMemo } from "react"

import { SearchIcon } from "@/components/icons/search-icon"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { featureFlags } from "@/config/features"
import { useCommand } from "@/features/command/hooks/use-command"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface HeaderCommandDialogButtonProps
  extends Omit<ComponentProps<typeof Button>, "children" | "onClick"> {}

export function HeaderCommandDialogButton(
  props: HeaderCommandDialogButtonProps
) {
  const { variant = "ghost", size = "sm", className, ...buttonProps } = props

  const { access } = useRestrictedAccess()
  const { status } = useVerida()

  const { openCommand } = useCommand()

  const shortcutText = useMemo(() => {
    if (typeof window === "undefined") {
      // To handle pre-rendering server-side
      return "Ctrl+K"
    }
    const macosPlatforms = /macOS|Macintosh|MacIntel|MacPPC|Mac68K/
    return macosPlatforms.test(window.navigator.userAgent) ? "⌘K" : "Ctrl+K"
  }, [])

  if (
    !featureFlags.commandDialog.enabled ||
    access !== "allowed" ||
    status !== "connected"
  ) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-1", className)}
          onClick={openCommand}
          {...buttonProps}
        >
          <SearchIcon className="size-6 shrink-0" />
          <span className="sr-only">Search</span>
          <span className="hidden rounded-sm bg-surface-hover p-1 text-base-s-regular text-muted-foreground md:inline-block">
            {shortcutText}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Search</TooltipContent>
    </Tooltip>
  )
}
HeaderCommandDialogButton.displayName = "HeaderCommandDialogButton"
