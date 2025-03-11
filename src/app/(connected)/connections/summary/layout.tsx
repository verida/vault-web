import { ReactNode } from "react"

import { ConnectionsSummaryNavTabs } from "@/app/(connected)/connections/summary/_components/connections-summary-nav-tabs"

export interface ConnectionsSummaryLayoutProps {
  children: ReactNode
}

export default function ConnectionsSummaryLayout(
  props: ConnectionsSummaryLayoutProps
) {
  const { children } = props

  return (
    <div className="flex min-h-full flex-col gap-4 sm:gap-6">
      <ConnectionsSummaryNavTabs />
      {children}
    </div>
  )
}
ConnectionsSummaryLayout.displayName = "ConnectionsSummaryLayout"
