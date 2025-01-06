"use client"

import { AvatarImage } from "@radix-ui/react-avatar"
import { intlFormat, isDate } from "date-fns"
import { ComponentProps, useMemo } from "react"

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"
import { VeridaRecord } from "@/features/verida-database/types"
import { cn } from "@/styles/utils"
import { SHORT_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export interface DataRequestItemPageDataSelectionProps {
  requestedDataSchemaUrl: string
  filter?: Record<string, unknown>
  selectionLimit?: number
  selectedDataItems: VeridaRecord[]
  onClickBack: () => void
  onSelectDataItem: (record: VeridaRecord) => void
  onUnselectDataItem: (recordId: string) => void
}

export function DataRequestItemPageDataSelection(
  props: DataRequestItemPageDataSelectionProps
) {
  const {
    requestedDataSchemaUrl,
    selectedDataItems,
    selectionLimit,
    onClickBack,
    onSelectDataItem,
    onUnselectDataItem,
  } = props

  const databaseName = useMemo(() => {
    return (
      USER_DATABASE_DEFS.find((db) =>
        requestedDataSchemaUrl.startsWith(db.schemaUrlBase)
      )?.databaseVaultName ?? ""
    )
  }, [requestedDataSchemaUrl])

  const { records, isLoading } = useVeridaDataRecords(
    {
      databaseName,
    },
    {
      enabled: !!databaseName,
    }
  )

  const selectedDataItemsCount = useMemo(
    () => selectedDataItems.length,
    [selectedDataItems]
  )

  return (
    <>
      <ItemSheetHeader hideCloseButton className="px-0 py-0">
        <div className="flex w-full flex-col gap-3 px-6 py-4">
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClickBack}
              className="-ml-2 shrink-0"
            >
              <ArrowLeftIcon className="size-5" />
              <span className="sr-only">Back</span>
            </Button>
            <ItemSheetTitle description="Data request item selection">
              Select data to share
            </ItemSheetTitle>
          </div>
        </div>
      </ItemSheetHeader>
      <ItemSheetBody className="flex flex-col gap-4">
        {selectionLimit === undefined ? null : (
          <div className="text-muted-foreground">
            <Typography variant="base-regular">{`${selectionLimit} selection${selectionLimit > 1 ? "s" : ""} maximum. ${selectedDataItemsCount} selected.`}</Typography>
          </div>
        )}
        {records ? (
          <>
            {records.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <EmptyState>
                  <EmptyStateImage />
                  <EmptyStateTitle>No data found</EmptyStateTitle>
                  <EmptyStateDescription>
                    You don't have data satisfying to the request
                  </EmptyStateDescription>
                </EmptyState>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {records.map((record) => (
                  <li key={record._id}>
                    <DataItem
                      record={record}
                      selected={selectedDataItems.some(
                        (item) => item._id === record._id
                      )}
                      onSelectChange={(checked) => {
                        if (checked) {
                          onSelectDataItem(record)
                        } else {
                          onUnselectDataItem(record._id)
                        }
                      }}
                      selectionDisabled={
                        selectionLimit !== undefined &&
                        selectedDataItemsCount >= selectionLimit
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : isLoading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <LoadingBlock>
              <LoadingBlockSpinner />
              <LoadingBlockTitle>Loading data</LoadingBlockTitle>
              <LoadingBlockDescription>
                We are loading your data
              </LoadingBlockDescription>
            </LoadingBlock>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <ErrorBlock>
              <ErrorBlockImage />
              <ErrorBlockTitle>Error loading data</ErrorBlockTitle>
              <ErrorBlockDescription>
                Something went wrong while loading your data
              </ErrorBlockDescription>
            </ErrorBlock>
          </div>
        )}
      </ItemSheetBody>
      <ItemSheetFooter className="flex flex-col gap-3">
        <Alert variant="warning">
          <AlertDescription>Carefully review your selection</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={onClickBack}>
          Back
        </Button>
      </ItemSheetFooter>
    </>
  )
}
DataRequestItemPageDataSelection.displayName =
  "DataRequestItemPageDataSelection"

interface DataItemProps extends Omit<ComponentProps<typeof Card>, "children"> {
  record: VeridaRecord
  selected?: boolean
  selectionDisabled?: boolean
  onSelectChange: (checked: boolean) => void
}

function DataItem(props: DataItemProps) {
  const {
    record,
    selected,
    selectionDisabled,
    onSelectChange,
    className,
    ...cardProps
  } = props

  const formattedDate = useMemo(() => {
    const date = new Date(record.insertedAt || "")
    if (!isDate(date)) {
      return EMPTY_VALUE_FALLBACK
    }

    return intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
  }, [record.insertedAt])

  return (
    <Card
      className={cn("flex flex-row items-center gap-2 px-4 py-3", className)}
      {...cardProps}
    >
      <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
        <Avatar className="size-16">
          <AvatarImage src={record.icon} />
          <AvatarFallback>{EMPTY_VALUE_FALLBACK}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <CardTitle variant="heading-5" className="line-clamp-2">
            {record.name}
          </CardTitle>
          <CardDescription
            className={cn("truncate", !record.summary ? "italic" : "")}
          >
            {record.summary || "No description available"}
          </CardDescription>
          {record.insertedAt ? (
            <CardDescription className={cn("truncate")}>
              {formattedDate}
            </CardDescription>
          ) : null}
        </div>
      </div>
      <Checkbox
        checked={selected}
        disabled={!selected && selectionDisabled}
        onCheckedChange={onSelectChange}
      />
    </Card>
  )
}
DataItem.displayName = "DataItem"
