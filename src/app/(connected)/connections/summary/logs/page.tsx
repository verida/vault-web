import { DataConnectionsLogsTable } from "@/components/data-connections/logs-table/data-connections-logs-table"
import { PageWrapper } from "@/components/page-wrapper"
import { MOCK_DATA_CONNECTION_LOGS } from "@/features/data-connections"

export default function ConnectionsLogsPage() {
  return (
    <PageWrapper pageTitle="Connection Logs">
      <DataConnectionsLogsTable logs={MOCK_DATA_CONNECTION_LOGS} />
    </PageWrapper>
  )
}
ConnectionsLogsPage.displayName = "ConnectionsLogsPage"
