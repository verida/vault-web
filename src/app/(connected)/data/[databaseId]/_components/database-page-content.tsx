import React from "react"

import { DataRecordsTable } from "@/app/(connected)/data/[databaseId]/_components/data-records-table"
import { DatabaseDefinition } from "@/features/data/types"

export type DatabasePageContentProps = {
  databaseDefinition: DatabaseDefinition
} & Omit<React.ComponentProps<typeof DataRecordsTable>, "children">

export function DatabasePageContent(props: DatabasePageContentProps) {
  const { databaseDefinition, ...dataRecordsTableProps } = props

  return (
    <DataRecordsTable
      databaseDefinition={databaseDefinition}
      {...dataRecordsTableProps}
    />
  )
}
DatabasePageContent.displayName = "DatabasePageContent"
