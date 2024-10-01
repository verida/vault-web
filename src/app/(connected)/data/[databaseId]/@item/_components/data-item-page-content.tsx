"use client"

import { useMemo } from "react"

import {
  GenericDataItemPageBody,
  GenericDataItemPageFooter,
  GenericDataItemPageTitle,
} from "@/app/(connected)/data/[databaseId]/@item/_components/generic-data-item-page"
import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Button } from "@/components/ui/button"
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
import { Skeleton } from "@/components/ui/skeleton"
import { DatabaseDefinition } from "@/features/data"
import { useVeridaDataRecord } from "@/features/verida-database/hooks/use-verida-data-record"

export type DataItemPageContentProps = {
  open: boolean
  onClose: () => void
  databaseDefinition: DatabaseDefinition
  itemId: string
}

// TODO: Transform this component into a handler that can be used for all data types, rendering the loading, error and not found states as needed, then fetching the record and rendering the content based on the data type
export function DataItemPageContent(props: DataItemPageContentProps) {
  const { open, onClose, databaseDefinition, itemId } = props

  const { record, isLoading, isError } = useVeridaDataRecord({
    databaseName: databaseDefinition.databaseVaultName,
    recordId: itemId,
  })

  // TODO: Fetch the schema of the record and pass it to the specific page components

  const title = useMemo(() => {
    if (record) {
      // TODO: Add switch to render the title based on the data type
      return <GenericDataItemPageTitle record={record} />
    }

    if (isLoading) {
      return <Skeleton className="h-6 w-64" />
    }

    return "Data Item"
  }, [isLoading, record])

  const body = useMemo(() => {
    if (record) {
      // TODO: Add switch to render the body based on the data type
      return <GenericDataItemPageBody record={record} />
    }

    if (isLoading) {
      return (
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Loading data item...</LoadingBlockTitle>
          <LoadingBlockDescription>
            Please wait while we fetch the item details.
          </LoadingBlockDescription>
        </LoadingBlock>
      )
    }

    if (isError) {
      return (
        <ErrorBlock>
          <ErrorBlockImage />
          <ErrorBlockTitle>Error fetching data</ErrorBlockTitle>
          <ErrorBlockDescription>
            There was an error retrieving the item. Please try again later.
          </ErrorBlockDescription>
        </ErrorBlock>
      )
    }

    return (
      <ErrorBlock>
        <ErrorBlockImage />
        <ErrorBlockTitle>Item not found</ErrorBlockTitle>
        <ErrorBlockDescription>
          The requested item could not be found.
        </ErrorBlockDescription>
      </ErrorBlock>
    )
  }, [record, isLoading, isError])

  const footer = useMemo(() => {
    if (record) {
      // TODO: Add switch to render the footer based on the data type
      return <GenericDataItemPageFooter record={record} onClose={onClose} />
    }

    return (
      <Button variant="outline" className="w-full" onClick={onClose}>
        Close
      </Button>
    )
  }, [record, onClose])

  return (
    <ItemSheet open={open} onClose={onClose}>
      <ItemSheetHeader onClose={onClose}>
        <ItemSheetTitle description="Data item">{title}</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>{body}</ItemSheetBody>
      <ItemSheetFooter>{footer}</ItemSheetFooter>
    </ItemSheet>
  )
}
DataItemPageContent.displayName = "DataItemPageContent"
