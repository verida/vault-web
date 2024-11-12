import Link from "next/link"

import { InboxWithBadge } from "@/components/icons/inbox-with-badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { featureFlags } from "@/config/features"
import { getInboxPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AppHeaderInboxLinkProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "className"
>

export function AppHeaderInboxLink(props: AppHeaderInboxLinkProps) {
  const { variant = "ghost", size = "sm", className } = props

  if (!featureFlags.inbox.enabled) {
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
AppHeaderInboxLink.displayName = "AppHeaderInboxLink"
