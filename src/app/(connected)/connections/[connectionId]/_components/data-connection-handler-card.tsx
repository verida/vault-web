import { ChevronDown } from "lucide-react"
import React from "react"

import { DataConnectionStatusBadge } from "@/components/data-connections/data-connection-status-badge"
import { Typography } from "@/components/typography"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { SupportedData } from "@/features/data-connections"
import { cn } from "@/styles/utils"

export type DataConnectionHandlerCardProps = {
  data: SupportedData
} & React.ComponentProps<typeof Card>

export function DataConnectionHandlerCard(
  props: DataConnectionHandlerCardProps
) {
  const { data, className, ...cardProps } = props

  return (
    <Card
      className={cn(
        "flex flex-col gap-0 rounded-2xl px-4 py-6 md:px-6",
        className
      )}
      {...cardProps}
    >
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle variant="heading-5">{data.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Status</Typography>
          </div>
          <DataConnectionStatusBadge status="connected" />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Last synced</Typography>
          </div>
          <Typography variant="base-regular">{data.lastSynced}</Typography>
        </div>
        <div className="flex items-start justify-between">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Sync summary</Typography>
          </div>
          <Typography className="max-w-40" variant="base-regular">
            {data.summary}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Synced data items</Typography>
          </div>
          <Typography className="max-w-40" variant="base-regular">
            {data.itemCount}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <Typography variant="base-regular">Backdate</Typography>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-muted px-3 py-1">
            <Typography className="max-w-40" variant="base-semibold">
              {data.backdate}
            </Typography>
            <ChevronDown className="size-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between p-0 pt-3">
        <Typography variant="base-semibold">Sync this data</Typography>
        <Switch />
      </CardFooter>
    </Card>
  )
}
DataConnectionHandlerCard.displayName = "DataConnectionHandlerCard"
