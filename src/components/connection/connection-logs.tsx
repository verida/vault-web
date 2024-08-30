import React from "react"

import ConnectionLogItem from "@/components/connection/connection-log-item"
import { Typography } from "@/components/typography"
import { connectionLogs } from "@/features/connections"

const ConnectionLogs = () => {
  return (
    <div className="space-y-6">
      <Typography variant={"heading-3"}>Connection Logs</Typography>

      <div>
        <div className="hidden text-secondary-foreground md:flex">
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
          {connectionLogs.map((log) => (
            <ConnectionLogItem log={log} key={log.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConnectionLogs
