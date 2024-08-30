import Image from "next/image"
import Link from "next/link"
import React from "react"

import { DataSchema } from "@/features/data"

import { Typography } from "../typography"
import { Card } from "../ui/card"

type Props = {
  data: any
  schema: DataSchema
}

const DataItem = ({ data, schema }: Props) => {
  return (
    <Link href={`?id=${data._id}`}>
      <Card className="flex w-full rounded-lg shadow-card">
        <div className="flex w-full flex-row items-center px-4 py-3 [&>p]:w-0 [&>p]:grow">
          {(data["icon"] || data["name"]) && (
            <div className="flex w-0 grow items-center gap-2 pr-3 text-secondary-foreground">
              {data["icon"] ? (
                <Image
                  src={data["icon"]}
                  width={40}
                  height={40}
                  alt="Issuer avatar"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              )}
              {data["name"] && (
                <Typography
                  variant="base-semibold"
                  className="truncate pr-3 text-secondary-foreground"
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
              className="truncate pr-3 text-secondary-foreground"
            >
              {data[key]}
            </Typography>
          ))}
        </div>
      </Card>
    </Link>
  )
}

export default DataItem
