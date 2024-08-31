"use client"

import React, { useState } from "react"

import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { ConnectionLog } from "@/features/connections"

export type ConnectionLogItemProps = {
  log: ConnectionLog
}

export function ConnectionLogItem(props: ConnectionLogItemProps) {
  const { log } = props

  const [showFull, setShowFull] = useState(false)

  return (
    <>
      <Card className="hidden py-6 md:flex">
        <div className="w-72 space-y-2 px-4">
          <Typography variant={"base-semibold"}>{log.source}</Typography>
          <Typography variant={"base-semibold"}>{log.type}</Typography>
          <Typography variant={"base-semibold"}>{log.id}</Typography>
        </div>
        <div className="w-0 grow px-4">
          <Typography variant={"base-semibold"}>{log.message}</Typography>
        </div>
        <div className="w-52 px-4">
          <Typography variant={"base-semibold"}>{log.timestamp}</Typography>
        </div>
      </Card>

      <Card className="block space-y-2 p-4 md:hidden">
        <Typography variant={"base-semibold"}>{log.source}</Typography>

        <div className="flex items-start justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-s-semibold"}>Data Type</Typography>
          </div>
          <Typography variant={"base-s-semibold"} className="max-w-40">
            {log.type}
          </Typography>
        </div>

        <div className="flex items-start justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-s-semibold"}>Account ID</Typography>
          </div>
          <Typography variant={"base-s-semibold"} className="max-w-40">
            {log.id}
          </Typography>
        </div>

        <div className="flex items-start justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-s-semibold"}>Message</Typography>
          </div>
          <Typography variant={"base-s-semibold"} className="max-w-40">
            {log.message.slice(0, showFull ? log.message.length : 60)}{" "}
            <span
              className="cursor-pointer text-primary-button"
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? "View less" : "View more"}
            </span>
          </Typography>
        </div>

        <div className="flex items-start justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-s-semibold"}>Timestamp</Typography>
          </div>
          <Typography variant={"base-s-semibold"} className="max-w-40">
            {log.timestamp}
          </Typography>
        </div>
      </Card>
    </>
  )
}
