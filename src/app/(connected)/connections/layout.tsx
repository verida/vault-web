import { Metadata } from "next"
import { notFound } from "next/navigation"

import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Connections",
}

type ConnectionsLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsLayout(props: ConnectionsLayoutProps) {
  const { children } = props

  if (!featureFlags.dataConnections.enabled) {
    notFound()
  }

  return children
}
ConnectionsLayout.displayName = "ConnectionsLayout"
