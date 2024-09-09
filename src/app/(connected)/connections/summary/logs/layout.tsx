import { notFound } from "next/navigation"

import { Typography } from "@/components/typography"
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

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div
        // Fixing the height to 3rem to keep this title aligned with the
        // Connections page title which is influenced by a button with this
        // 3rem height
        className="flex h-12 flex-row items-center"
      >
        <Typography variant="heading-3">Connection Logs</Typography>
      </div>
      {children}
    </div>
  )
}
ConnectionsLogsLayout.displayName = "ConnectionsLogsLayout"
