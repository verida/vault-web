"use client"

import Link from "next/link"
import { type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { featureFlags } from "@/config/features"
import { useRestrictedAccess } from "@/features/restricted-access/hooks/use-restricted-access"
import { getInboxPageRoute } from "@/features/routes/utils"
import { InboxWithBadge } from "@/features/verida-inbox/components/inbox-with-badge"
import { useVerida } from "@/features/verida/hooks/use-verida"
import { cn } from "@/styles/utils"

export interface HeaderInboxButtonProps
  extends Pick<
    ComponentProps<typeof Button>,
    "variant" | "size" | "className"
  > {}

export function HeaderInboxButton(props: HeaderInboxButtonProps) {
  const { variant = "ghost", size = "sm", className } = props

  const { access } = useRestrictedAccess()
  const { isConnected } = useVerida()

  if (!featureFlags.inbox.enabled || access !== "allowed" || !isConnected) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size={size} className={cn(className)} asChild>
          <Link href={getInboxPageRoute()}>
            <InboxWithBadge />
            <span className="sr-only">Inbox</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Inbox</TooltipContent>
    </Tooltip>
  )
}
HeaderInboxButton.displayName = "HeaderInboxButton"
