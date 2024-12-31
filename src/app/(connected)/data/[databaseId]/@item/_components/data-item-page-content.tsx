"use client"

import { useMemo } from "react"

import {
  DataDeleteRecordDialog,
  DataDeleteRecordDialogTrigger,
} from "@/app/(connected)/data/[databaseId]/@item/_components/data-delete-record-dialog"
import {
  GenericDataItemPageBody,
  GenericDataItemPageFooter,
  GenericDataItemPageTitle,
} from "@/app/(connected)/data/[databaseId]/@item/_components/generic-data-item-page"
import { DeleteIcon } from "@/components/icons/delete-icon"
import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetContent,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { featureFlags } from "@/config/features"
import { DatabaseDefinition } from "@/features/data/types"
import { useVeridaDataRecord } from "@/features/verida-database/hooks/use-verida-data-record"

export type DataItemPageContentProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  databaseDefinition: DatabaseDefinition
  itemId: string
}

// TODO: Transform this component into a handler that can be used for all data types, rendering the loading, error and not found states as needed, then fetching the record and rendering the content based on the data type
export function DataItemPageContent(props: DataItemPageContentProps) {
  const { open, onOpenChange, databaseDefinition, itemId } = props

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
        <ItemSheetBody>
          <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>Loading data item...</LoadingBlockTitle>
              <LoadingBlockDescription>
                Please wait while we fetch the item details.
              </LoadingBlockDescription>
            </LoadingBlock>
          </div>
        </ItemSheetBody>
      )
    }

    if (isError) {
      return (
        <ItemSheetBody>
          <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Error fetching data</ErrorBlockTitle>
              <ErrorBlockDescription>
                There was an error retrieving the item. Please try again later.
              </ErrorBlockDescription>
            </ErrorBlock>
          </div>
        </ItemSheetBody>
      )
    }

    return (
      <ItemSheetBody>
        <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
          <ErrorBlock>
            <ErrorBlockImage />
            <ErrorBlockTitle>Item not found</ErrorBlockTitle>
            <ErrorBlockDescription>
              The requested item could not be found.
            </ErrorBlockDescription>
          </ErrorBlock>
        </div>
      </ItemSheetBody>
    )
  }, [record, isLoading, isError])

  const footer = useMemo(() => {
    if (record) {
      // TODO: Add switch to render the footer based on the data type
      return <GenericDataItemPageFooter record={record} />
    }

    return (
      <ItemSheetFooter>
        <Button variant="outline" className="w-full" asChild>
          <ItemSheetClose>Close</ItemSheetClose>
        </Button>
      </ItemSheetFooter>
    )
  }, [record])

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>
        <ItemSheetHeader
          right={
            record && featureFlags.data.record.delete ? (
              <Tooltip>
                <DataDeleteRecordDialog
                  databaseDefinition={databaseDefinition}
                  recordId={itemId}
                >
                  <DataDeleteRecordDialogTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button variant="outline-destructive" size="icon">
                        <DeleteIcon className="size-5 shrink-0" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TooltipTrigger>
                  </DataDeleteRecordDialogTrigger>
                </DataDeleteRecordDialog>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            ) : undefined
          }
        >
          <ItemSheetTitle description="Data item">{title}</ItemSheetTitle>
        </ItemSheetHeader>
        {body}
        {footer}
      </ItemSheetContent>
    </ItemSheet>
  )
}
DataItemPageContent.displayName = "DataItemPageContent"
