import React from "react"

import { DataItem } from "@/app/(connected)/data/[databaseId]/_components/data-item"
import { Typography } from "@/components/typography"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import { DataSchema, DatabaseDefinition } from "@/features/data/types"
import { VeridaRecord } from "@/features/verida-database/types"

export type DatabaseRecordsTableProps = {
  records: VeridaRecord[]
  dataSchema: DataSchema
  databaseDefinition: DatabaseDefinition
}

// TODO: To be reworked

export function DatabaseRecordsTable(props: DatabaseRecordsTableProps) {
  const { records, dataSchema, databaseDefinition } = props

  if (records.length === 0) {
    return (
      <EmptyState>
        <EmptyStateImage />
        <EmptyStateTitle>{`No ${databaseDefinition.titlePlural}`}</EmptyStateTitle>
        <EmptyStateDescription>
          {`You have no ${databaseDefinition.titlePlural} stored in your Vault yet.`}
        </EmptyStateDescription>
      </EmptyState>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-row items-center p-4 [&>p]:w-0 [&>p]:grow">
        {records[0]["name"] || records[0]["icon"] ? (
          <Typography
            variant="base-s-semibold"
            className="text-muted-foreground"
          >
            {databaseDefinition.title} Name
          </Typography>
        ) : null}
        {dataSchema.layouts?.view.map((key) => (
          <Typography
            key={key}
            variant="base-s-semibold"
            className="text-muted-foreground"
          >
            {dataSchema?.properties[key]?.title}
          </Typography>
        ))}
      </div>
      {records.map((record, index) => (
        <DataItem data={record} key={index} schema={dataSchema} />
      ))}
    </div>
  )
}
DatabaseRecordsTable.displayName = "DatabaseRecordsTable"
