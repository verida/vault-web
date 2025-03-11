"use client"

import { intlFormat, isDate } from "date-fns"
import { useCallback } from "react"

import {
  DataDeleteRecordDialog,
  DataDeleteRecordDialogTrigger,
} from "@/app/(connected)/data/[databaseId]/@item/_components/data-delete-record-dialog"
import { DeleteIcon } from "@/components/icons/delete-icon"
import {
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetFooter,
  ItemSheetHeader,
  ItemSheetTitle,
} from "@/components/layouts/item-sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"
import { featureFlags } from "@/config/features"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { DatabaseDefinition } from "@/features/data/types"
import { VeridaRecord } from "@/features/verida-database/types"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export interface GenericDataItemPageContentProps {
  record: VeridaRecord
  databaseDefinition: DatabaseDefinition
}

export function GenericDataItemPageContent(
  props: GenericDataItemPageContentProps
) {
  const { record, databaseDefinition } = props

  const {
    _id,
    _rev,
    insertedAt,
    modifiedAt,
    schema,
    name,
    summary,
    signatures,
    ...otherProperties
  } = record

  return (
    <>
      <ItemSheetHeader
        right={
          featureFlags.data.record.delete ? (
            <Tooltip>
              <DataDeleteRecordDialog
                databaseDefinition={databaseDefinition}
                recordId={_id}
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
        <ItemSheetTitle description="Data item">{record.name}</ItemSheetTitle>
      </ItemSheetHeader>
      <ItemSheetBody>
        <div className="flex flex-col gap-4">
          <GenericDataItemField propertyName={"name"} value={name} />
          <GenericDataItemField propertyName={"summary"} value={summary} />
          {Object.entries(otherProperties).map(([key, value]) => (
            <GenericDataItemField key={key} propertyName={key} value={value} />
          ))}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-muted-foreground">
                <Typography variant="base-semibold">
                  Additional Properties
                </Typography>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <GenericDataItemField propertyName={"_id"} value={_id} />
                <GenericDataItemField propertyName={"_rev"} value={_rev} />
                <GenericDataItemField
                  propertyName={"insertedAt"}
                  value={insertedAt}
                />
                <GenericDataItemField
                  propertyName={"modifiedAt"}
                  value={modifiedAt}
                />
                <GenericDataItemField propertyName={"schema"} value={schema} />
                <GenericDataItemField
                  propertyName={"signatures"}
                  value={signatures}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ItemSheetBody>
      <ItemSheetFooter>
        <Button variant="outline" className="w-full" asChild>
          <ItemSheetClose>Close</ItemSheetClose>
        </Button>
      </ItemSheetFooter>
    </>
  )
}
GenericDataItemPageContent.displayName = "GenericDataItemPageContent"

export interface GenericDataItemFieldProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  propertyName: string
  value: unknown
}

export function GenericDataItemField(props: GenericDataItemFieldProps) {
  const { propertyName, value, className, ...divProps } = props

  const formatValue = useCallback(
    // TODO: Use the property name if needed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (value: unknown, _propertyName: string): string => {
      if (value === null || typeof value === "undefined") {
        return EMPTY_VALUE_FALLBACK
      }

      if (typeof value === "object") {
        return JSON.stringify(value, null, 2)
      }

      // Try to parse as date if it's a string
      if (typeof value === "string") {
        const date = new Date(value)
        if (isDate(date) && !isNaN(date.getTime())) {
          return intlFormat(date, LONG_DATE_TIME_FORMAT_OPTIONS)
        }
      }

      return String(value)
    },
    []
  )

  return (
    <div className={cn("flex flex-col gap-1", className)} {...divProps}>
      <div className="text-muted-foreground">
        <Typography variant="base-semibold">{propertyName}</Typography>
      </div>
      <Typography variant="base-regular" className="break-words">
        {formatValue(value, propertyName)}
      </Typography>
    </div>
  )
}
GenericDataItemField.displayName = "GenericDataItemField"
