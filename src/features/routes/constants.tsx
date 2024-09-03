import { AiAssistantIcon } from "@/components/icons/ai-assistant-icon"
import { Connection } from "@/components/icons/connection"
import { Data } from "@/components/icons/data"
import { InboxWithBadge } from "@/components/icons/inbox-with-badge"
import { featureFlags } from "@/config/features"
import { RouteDefinition } from "@/features/routes/types"
import {
  getAssistantPageRoute,
  getConnectionsPageRoute,
  getDataPageRoute,
  getInboxPageRoute,
} from "@/features/routes/utils"

const assistantRoute: RouteDefinition[] = featureFlags.assistant.enabled
  ? [
      {
        icon: <AiAssistantIcon />,
        label: (
          <span className="bg-ai-assistant-gradient bg-clip-text text-transparent">
            AI Assistant
          </span>
        ),
        href: getAssistantPageRoute(),
      },
    ]
  : []

export const NAV_ROUTES: RouteDefinition[] = [
  ...assistantRoute,
  {
    icon: <InboxWithBadge />,
    label: "Inbox",
    href: getInboxPageRoute(),
  },
  {
    icon: <Data />,
    label: "Data",
    href: getDataPageRoute(),
  },
  {
    icon: <Connection />,
    label: "Connections",
    href: getConnectionsPageRoute(),
  },
]
