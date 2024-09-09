import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { DataSchema } from "@/features/data"

export type DataItemProps = {
  data: any
  schema: DataSchema
}

export function DataItem(props: DataItemProps) {
  const { data, schema } = props

  return (
    <Link href={`?id=${data._id}`}>
      <Card className="flex w-full rounded-lg">
        <div className="flex w-full flex-row items-center px-4 py-3 [&>p]:w-0 [&>p]:grow">
          {(data["icon"] || data["name"]) && (
            <div className="flex w-0 grow items-center gap-2 pr-3 text-muted-foreground">
              {data["icon"] ? (
                <Image
                  src={data["icon"]}
                  width={40}
                  height={40}
                  alt="Issuer avatar"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-muted"></div>
              )}
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
