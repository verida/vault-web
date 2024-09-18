"use client"

import ConnectionsSummaryLogsLoadingPage from "@/app/(connected)/connections/summary/logs/loading"
import { DataConnectionsLogsTable } from "@/components/data-connections/logs-table/data-connections-logs-table"
import { PageWrapper } from "@/components/page-wrapper"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import { useDataConnectionsLogs } from "@/features/data-connections"

export default function ConnectionsLogsPage() {
  const { logs, isLoading, isError, error } = useDataConnectionsLogs()

  // TODO: Move most of the logic (empty state, loading state, error state) in the logs table component

  if (logs) {
    return (
      <PageWrapper pageTitle="Connection Logs">
        {logs.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <EmptyState>
              <EmptyStateImage />
              <EmptyStateTitle>No connections logs yet</EmptyStateTitle>
              <EmptyStateDescription>
                {`There hasn't been any sync activities on your data connections yet.`}
              </EmptyStateDescription>
            </EmptyState>
          </div>
        ) : (
          // TODO: Pass pagination info to table
          <DataConnectionsLogsTable logs={logs} />
        )}
      </PageWrapper>
    )
  }

  if (isLoading) {
    return <ConnectionsSummaryLogsLoadingPage />
  }

  if (isError) {
    throw error
  }

  return null // Should not happen
}
ConnectionsLogsPage.displayName = "ConnectionsLogsPage"
