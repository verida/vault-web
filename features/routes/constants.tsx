import { AiAssistantIcon } from "@/components/icons/ai-assistant-icon"
import { Connection } from "@/components/icons/connection"
import { Data } from "@/components/icons/data"
import { InboxWithBadge } from "@/components/icons/inbox-with-badge"
import {
  getAssistantPageRoute,
  getConectionsPageRoute,
  getDataPageRoute,
  getInboxPageRoute,
} from "@/features/routes/utils"

export const NAV_ROUTES = [
  {
    icon: <AiAssistantIcon />,
    title: "AI Assistant",
    href: getAssistantPageRoute(),
  },
  {
    icon: <InboxWithBadge />,
    title: "Inbox",
    href: getInboxPageRoute(),
  },
  {
    icon: <Data />,
    title: "Data",
    href: getDataPageRoute(),
  },
  {
    icon: <Connection />,
    title: "Connections",
    href: getConectionsPageRoute(),
  },
]
