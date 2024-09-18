"use client"

import { DataConnectionsLogsTable } from "@/components/data-connections/logs-table/data-connections-logs-table"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  DataConnection,
  useDataConnectionLogs,
} from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionLogsProps = {
  connection: DataConnection
} & React.ComponentProps<"div">

export function DataConnectionLogs(props: DataConnectionLogsProps) {
  const { connection, className, ...divProps } = props

  // TODO: Move most of the logic (empty state, loading state, error state) in the logs table component

  const { logs, isLoading } = useDataConnectionLogs({
    providerId: connection.provider,
    accountId: connection.providerId,
  })

  return (
    <div className={cn(className)} {...divProps}>
      {logs ? (
        <>
          {logs.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <EmptyState>
                <EmptyStateImage />
                <EmptyStateTitle>No connections logs yet</EmptyStateTitle>
                <EmptyStateDescription>
                  {`There hasn't been any sync activities for this data connection yet.`}
                </EmptyStateDescription>
              </EmptyState>
            </div>
          ) : (
            // TODO: Pass pagination info to table
            <DataConnectionsLogsTable logs={logs} hideConnectionColumn />
          )}
        </>
      ) : isLoading ? (
        // TODO: Create a skeleton of the log card
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Loading connection logs...</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we load the connection logs.
          </LoadingBlockDescription>
        </LoadingBlock>
      ) : (
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockTitle>Error</ErrorBlockTitle>
          <ErrorBlockDescription>
            There was an error getting the connection logs. Please try again
            later.
          </ErrorBlockDescription>
        </ErrorBlock>
      )}
    </div>
  )
}
DataConnectionLogs.displayName = "DataConnectionLogs"
