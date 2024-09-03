import { DataConnectionLogsTableRow } from "@/components/data-connections/logs-table/data-connection-logs-table-row"
import { Typography } from "@/components/typography"
import { DataConnectionLog } from "@/features/data-connections/types"

type DataConnectionsLogsTableProps = {
  logs: DataConnectionLog[]
} & React.ComponentProps<"div">

export function DataConnectionsLogsTable(props: DataConnectionsLogsTableProps) {
  const { logs, ...divProps } = props

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-0">
        <div className="hidden text-muted-foreground md:flex">
          <Typography variant="base-s-semibold" className="w-72 p-4">
            Data source / Data type / Account ID
          </Typography>
          <Typography variant="base-s-semibold" className="grow p-4">
            Message
          </Typography>
          <Typography variant="base-s-semibold" className="w-52 p-4">
            Timestamp
          </Typography>
        </div>
        <div className="space-y-3">
          {logs.map((log, index) => (
            <DataConnectionLogsTableRow log={log} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
DataConnectionsLogsTable.displayName = "DataConnectionsLogsTable"
