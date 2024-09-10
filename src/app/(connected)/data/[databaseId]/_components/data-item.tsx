import Link from "next/link"
import React from "react"

import { Typography } from "@/components/typography"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { DataSchema } from "@/features/data"

export type DataItemProps = {
  data: any
  schema: DataSchema
}

export function DataItem(props: DataItemProps) {
  const { data, schema } = props

  return (
    <Link href={`?id=${data._id}`} className="rounded-lg">
      <Card className="flex w-full rounded-lg hover:border-border-hover hover:bg-surface-hover">
        <div className="flex w-full flex-row items-center px-4 py-3 [&>p]:w-0 [&>p]:grow">
          {(data["icon"] || data["name"]) && (
            <div className="flex w-0 grow items-center gap-2 pr-3 text-muted-foreground">
              {data["icon"] ? (
                <Avatar className="size-10">
                  <AvatarImage src={data["icon"]} />
                </Avatar>
              ) : null}
              {data["name"] && (
                <Typography
                  variant="base-semibold"
                  className="truncate pr-3 text-muted-foreground"
                >
                  {data["name"]}
                </Typography>
              )}
            </div>
          )}
          {schema.layouts.view.map((key) => (
            <Typography
              key={key}
              variant="base-semibold"
              className="truncate pr-3 text-muted-foreground"
            >
              {data[key]}
            </Typography>
          ))}
        </div>
      </Card>
    </Link>
  )
}
