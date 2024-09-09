"use client"

import { useSearchParams } from "next/navigation"
import React from "react"

import { DataItemDetailsSheet } from "@/app/(connected)/data/[databaseId]/_components/data-item-details-sheet"
import { DatabaseRecordsTable } from "@/app/(connected)/data/[databaseId]/_components/database-records-table"
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTitle,
} from "@/components/ui/empty-state"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { DatabaseDefinition } from "@/features/data"
import { useData } from "@/features/data/hooks"
import { useDataSchema } from "@/features/data/hooks/useDataSchema"

export type DatabasePageContentProps = {
  databaseDefinition: DatabaseDefinition
}

export function DatabasePageContent(props: DatabasePageContentProps) {
  const { databaseDefinition } = props

  const { dataItems: records, isDataItemsPending: isRecordsLoading } =
    useData<any>(databaseDefinition.databaseVaultName) // TODO: Type properly

  const { dataSchema, isDataSchemaPending: isDataSchemaLoading } =
    useDataSchema(records?.at(0)?.schema || "")

  const searchParams = useSearchParams()

  const itemId = searchParams.get("id")
  const selectedItem = records?.find((it) => it._id === itemId)

  if (records && dataSchema) {
    return (
      <>
        <DatabaseRecordsTable
          records={records}
          dataSchema={dataSchema}
          databaseDefinition={databaseDefinition}
        />
        <DataItemDetailsSheet
          open={Boolean(itemId)}
          data={selectedItem}
          schema={dataSchema}
          folder={databaseDefinition}
        />
      </>
    )
  }

  if (records?.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <EmptyState>
          <EmptyStateImage />
          <EmptyStateTitle>{`No ${databaseDefinition.titlePlural}`}</EmptyStateTitle>
          <EmptyStateDescription>
            {`You have no ${databaseDefinition.titlePlural} stored in your Vault yet.`}
          </EmptyStateDescription>
        </EmptyState>
      </div>
    )
  }

  if (isRecordsLoading || isDataSchemaLoading) {
    return (
      // TODO: Replace by a skeleton table rows
      <div className="flex flex-1 flex-col items-center justify-center">
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>{`Loading ${databaseDefinition.titlePlural}...`}</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we load your data.
          </LoadingBlockDescription>
        </LoadingBlock>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <ErrorBlock>
        <ErrorBlockImage />
        <ErrorBlockTitle>Data Error</ErrorBlockTitle>
        <ErrorBlockDescription>
          {`There was an error getting your ${databaseDefinition.titlePlural}. Please try again later.`}
        </ErrorBlockDescription>
      </ErrorBlock>
    </div>
  )
}
DatabasePageContent.displayName = "DatabasePageContent"
