import React from "react"

import { DataRecordsTable } from "@/app/(connected)/data/[databaseId]/_components/data-records-table"
import { DatabaseDefinition } from "@/features/data"

export type DatabasePageContentProps = {
  databaseDefinition: DatabaseDefinition
}

export function DatabasePageContent(props: DatabasePageContentProps) {
  const { databaseDefinition } = props

  return <DataRecordsTable databaseDefinition={databaseDefinition} />
}
DatabasePageContent.displayName = "DatabasePageContent"
