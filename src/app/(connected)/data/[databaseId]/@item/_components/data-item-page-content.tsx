"use client"

import { useMemo } from "react"

import { GenericDataItemPageContent } from "@/app/(connected)/data/[databaseId]/@item/_components/generic-data-item-page-content"
import {
  ItemSheet,
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetContent,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/layouts/item-sheet"
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
import type { DatabaseDefinition } from "@/features/data/types"
import { useVeridaDataRecord } from "@/features/verida-database/hooks/use-verida-data-record"

export interface DataItemPageContentProps {
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

  const content = useMemo(() => {
    if (record) {
      // TODO: Add switch to render the content based on the data type
      return (
        <GenericDataItemPageContent
          record={record}
          databaseDefinition={databaseDefinition}
        />
      )
    }

    return (
      <>
        <ItemSheetHeader>
          <ItemSheetTitle description="Data item">
            <Skeleton className="h-6 w-64" />
          </ItemSheetTitle>
        </ItemSheetHeader>
        <ItemSheetBody>
          <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
            {isLoading ? (
              <LoadingBlock>
                <LoadingBlockSpinner />
                <LoadingBlockTitle>Loading data item...</LoadingBlockTitle>
                <LoadingBlockDescription>
                  Please wait while we fetch the item details.
                </LoadingBlockDescription>
              </LoadingBlock>
            ) : isError ? (
              <ErrorBlock>
                <ErrorBlockImage />
                <ErrorBlockTitle>Error fetching data</ErrorBlockTitle>
                <ErrorBlockDescription>
                  There was an error retrieving the item. Please try again
                  later.
                </ErrorBlockDescription>
              </ErrorBlock>
            ) : (
              <ErrorBlock>
                <ErrorBlockImage />
                <ErrorBlockTitle>Item not found</ErrorBlockTitle>
                <ErrorBlockDescription>
                  The requested item could not be found.
                </ErrorBlockDescription>
              </ErrorBlock>
            )}
          </div>
        </ItemSheetBody>
        <ItemSheetFooter>
          <Button variant="outline" className="w-full" asChild>
            <ItemSheetClose>Close</ItemSheetClose>
          </Button>
        </ItemSheetFooter>
      </>
    )
  }, [record, databaseDefinition, isLoading, isError])

  return (
    <ItemSheet open={open} onOpenChange={onOpenChange}>
      <ItemSheetContent>{content}</ItemSheetContent>
    </ItemSheet>
  )
}
DataItemPageContent.displayName = "DataItemPageContent"
