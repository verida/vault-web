import { ConnectionsSummaryNavTabs } from "@/app/(connected)/connections/summary/_components/connections-summary-nav-tabs"

type ConnectionsSummaryLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsSummaryLayout(
  props: ConnectionsSummaryLayoutProps
) {
  const { children } = props

  return (
    <div className="flex min-h-full flex-col gap-4 pb-4 sm:gap-6 md:pb-6 xl:pb-8">
      <ConnectionsSummaryNavTabs />
      {children}
    </div>
  )
}
ConnectionsSummaryLayout.displayName = "ConnectionsSummaryLayout"
