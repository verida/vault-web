"use client"

import { AvatarImage } from "@radix-ui/react-avatar"
import { intlFormat, isDate } from "date-fns"
import { XIcon } from "lucide-react"
import {
  type ComponentProps,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react"
import { useDebounce } from "use-debounce"

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon"
import { SearchIcon } from "@/components/icons/search-icon"
import {
  ItemSheetBody,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/layouts/item-sheet"
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
import { Input } from "@/components/ui/input"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { Typography } from "@/components/ui/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { USER_DATABASE_DEFS } from "@/features/data/constants"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"
import type { VeridaRecord } from "@/features/verida-database/types"
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
    filter,
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

  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch] = useDebounce(searchValue, 500)

  const resolvedFilter = useMemo(() => {
    const requestFilter = filter && typeof filter === "object" ? filter : {}

    const searchFilter =
      debouncedSearch && debouncedSearch.length > 0
        ? {
            $or: [
              {
                name: {
                  $regex: debouncedSearch,
                },
              },
              {
                summary: {
                  $regex: debouncedSearch,
                },
              },
            ],
          }
        : {}

    return {
      $and: [requestFilter, searchFilter],
    }
  }, [debouncedSearch, filter])

  const { records, isLoading } = useVeridaDataRecords(
    {
      databaseName,
      filter: resolvedFilter,
    },
    {
      enabled: !!databaseName,
    }
  )

  const handleClearSearch = useCallback(() => {
    setSearchValue("")
  }, [setSearchValue])

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
          <Input
            placeholder="Search your data..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            startAdornment={
              <SearchIcon className="ml-3 size-6 shrink-0 text-muted-foreground" />
            }
            endAdornmentContainerClassName="p-0"
            endAdornment={
              searchValue.length > 0 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1 mt-0.5 h-8 w-8"
                  onClick={handleClearSearch}
                >
                  <XIcon className="size-6" />
                </Button>
              ) : null
            }
          />
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
                    There is no data satisfying the request
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

  const checkboxId = useId()

  const formattedDate = useMemo(() => {
    const date = new Date(record.insertedAt || "")
    if (!isDate(date)) {
      return EMPTY_VALUE_FALLBACK
    }

    return intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
  }, [record.insertedAt])

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "cursor-pointer",
        !selected && selectionDisabled ? "cursor-not-allowed" : ""
      )}
    >
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
            <CardTitle
              variant="heading-5"
              component="p"
              className="line-clamp-2"
            >
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
          id={checkboxId}
          checked={selected}
          disabled={!selected && selectionDisabled}
          onCheckedChange={onSelectChange}
          className="shrink-0"
        />
      </Card>
    </label>
  )
}
DataItem.displayName = "DataItem"
