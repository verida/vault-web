import { ComponentProps } from "react"

import { DataRecordsTable } from "@/app/(connected)/data/[databaseId]/_components/data-records-table"
import { DatabaseDefinition } from "@/features/data/types"

export interface DatabasePageContentProps
  extends Omit<ComponentProps<typeof DataRecordsTable>, "children"> {
  databaseDefinition: DatabaseDefinition
}

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
