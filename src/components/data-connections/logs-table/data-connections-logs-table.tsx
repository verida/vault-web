import { DataConnectionLogsTableRow } from "@/components/data-connections/logs-table/data-connection-logs-table-row"
import { Typography } from "@/components/typography"
import { DataConnectionSyncLog } from "@/features/data-connections/types"

type DataConnectionsLogsTableProps = {
  logs: DataConnectionSyncLog[]
  hideConnectionColumn?: boolean
} & React.ComponentProps<"div">

export function DataConnectionsLogsTable(props: DataConnectionsLogsTableProps) {
  const { logs, hideConnectionColumn = false, ...divProps } = props

  // TODO: Handle pagination
  // TODO: Handle empty state, loading state, error state
  // TODO: Allow overriding the loading state, empty state and error state messages

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-0">
        <div className="hidden flex-row gap-8 px-8 py-4 text-muted-foreground md:flex">
          {!hideConnectionColumn ? (
            <Typography variant="base-s-semibold" className="w-52">
              Connection
            </Typography>
          ) : null}
          <Typography variant="base-s-semibold" className="flex-1">
            Message
          </Typography>
          <Typography variant="base-s-semibold" className="w-44 text-right">
            Timestamp
          </Typography>
        </div>
        <ul className="flex flex-col gap-4">
          {logs.map((log, index) => (
            <li key={index}>
              <DataConnectionLogsTableRow log={log} hideConnectionColumn />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
DataConnectionsLogsTable.displayName = "DataConnectionsLogsTable"
