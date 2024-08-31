import { ChevronDown, ChevronRight } from "lucide-react"
import React from "react"

import { Typography } from "@/components/typography"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { SupportedData } from "@/features/connections"

export type SupportedDataCardProps = {
  data: SupportedData
}

export function SupportedDataCard(props: SupportedDataCardProps) {
  const { data } = props

  return (
    <Card className="p-6">
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center justify-between">
          <Typography variant={"heading-5"}>{data.title}</Typography>
          <div className="flex cursor-pointer items-center gap-1 text-primary-button">
            <Typography variant={"base-semibold"}>View Data</Typography>
            <ChevronRight className="size-5" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>Status</Typography>
          </div>

          <Typography
            className="rounded-md bg-approved px-3 py-1 text-primary"
            variant={"base-semibold"}
          >
            Connected
          </Typography>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>Last synced</Typography>
          </div>
          <Typography variant={"base-regular"}>{data.lastSynced}</Typography>
        </div>

        <div className="flex items-start justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>Sync summary</Typography>
          </div>
          <Typography className="max-w-40" variant={"base-regular"}>
            {data.summary}
          </Typography>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>Synced data items</Typography>
          </div>
          <Typography className="max-w-40" variant={"base-regular"}>
            {data.itemCount}
          </Typography>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>Backdate</Typography>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary-activity-sending px-3 py-1">
            <Typography className="max-w-40" variant={"base-semibold"}>
              {data.backdate}
            </Typography>
            <ChevronDown className="size-5 text-secondary-foreground" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-secondary-foreground">
            <Typography variant={"base-regular"}>
              Only include emails from contacts
            </Typography>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter className="mt-3 flex items-center justify-between border-t border-border p-0 pt-3">
        <Typography variant={"base-semibold"}>Sync this data</Typography>
        <Switch />
      </CardFooter>
    </Card>
  )
}
