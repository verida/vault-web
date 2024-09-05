import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

type ConnectionsLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsLayout(props: ConnectionsLayoutProps) {
  const { children } = props

  if (!featureFlags.dataConnections.enabled) {
    notFound()
  }

  return <>{children}</>
}
ConnectionsLayout.displayName = "ConnectionsLayout"
