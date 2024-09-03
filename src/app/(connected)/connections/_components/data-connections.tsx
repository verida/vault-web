import React from "react"

import { DataConnectionsList } from "@/app/(connected)/connections/_components/data-connections-list"
import { DataProvidersList } from "@/app/(connected)/connections/_components/data-providers-list"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

export function DataConnections() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="heading-3">Connections</Typography>
        <Button>Add Connection</Button>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6">
        <Typography variant="heading-4">My Connections</Typography>
        <DataConnectionsList />
      </div>
      <div className="flex flex-col gap-4 sm:gap-6">
        <Typography variant="heading-4">Available Connections</Typography>
        <DataProvidersList />
      </div>
    </div>
  )
}
DataConnections.displayName = "DataConnections"
