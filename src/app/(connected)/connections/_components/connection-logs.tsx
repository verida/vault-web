import React from "react"

import { ConnectionLogItem } from "@/app/(connected)/connections/_components/connection-log-item"
import { Typography } from "@/components/typography"
import { MOCK_CONNECTION_LOGS } from "@/features/connections"

export function ConnectionLogs() {
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
          {MOCK_CONNECTION_LOGS.map((log) => (
            <ConnectionLogItem log={log} key={log.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
