import { Typography } from "@/components/typography"

type ConnectionsLogsLayoutProps = {
  children: React.ReactNode
}

export default function ConnectionsLogsLayout(
  props: ConnectionsLogsLayoutProps
) {
  const { children } = props

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="heading-3">Connection Logs</Typography>
      {children}
    </div>
  )
}
ConnectionsLogsLayout.displayName = "ConnectionsLogsLayout"
