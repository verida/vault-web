import React from "react"

import { DataConnectionLogItem } from "@/app/(connected)/connections/_components/data-connection-log-item"
import { Typography } from "@/components/typography"
import { MOCK_DATA_CONNECTION_LOGS } from "@/features/data-connections"

export function DataConnectionLogs() {
  return (
    <div className="space-y-6">
      <Typography variant={"heading-3"}>Connection Logs</Typography>

      <div>
        <div className="hidden text-muted-foreground md:flex">
          <Typography variant={"base-s-semibold"} className="w-72 p-4">
            Data source / Data type / Account ID
          </Typography>
          <Typography variant={"base-s-semibold"} className="grow p-4">
            Message
          </Typography>
          <Typography variant={"base-s-semibold"} className="w-52 p-4">
            Timestamp
          </Typography>
        </div>
        <div className="space-y-3">
          {MOCK_DATA_CONNECTION_LOGS.map((log) => (
            <DataConnectionLogItem log={log} key={log.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
DataConnectionLogs.displayName = "DataConnectionLogs"
