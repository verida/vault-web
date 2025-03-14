import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { type ReactNode } from "react"

import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Connections",
}

export interface ConnectionsLayoutProps {
  children: ReactNode
}

export default function ConnectionsLayout(props: ConnectionsLayoutProps) {
  const { children } = props

  if (!featureFlags.dataConnections.enabled) {
    notFound()
  }

  return children
}
ConnectionsLayout.displayName = "ConnectionsLayout"
