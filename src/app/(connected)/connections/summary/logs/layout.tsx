import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

type ConnectionsLogsLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsLogsLayout(
  props: ConnectionsLogsLayoutProps
) {
  const { children } = props

  if (!featureFlags.dataConnections.logs.enabled) {
    notFound()
  }

  return children
}
ConnectionsLogsLayout.displayName = "ConnectionsLogsLayout"
