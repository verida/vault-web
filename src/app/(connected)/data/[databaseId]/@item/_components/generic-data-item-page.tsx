"use client"

import { intlFormat, isDate } from "date-fns"
import { useCallback } from "react"

import {
  ItemSheetBody,
  ItemSheetClose,
  ItemSheetFooter,
} from "@/components/item-sheet"
import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaRecord } from "@/features/verida-database/types"
import { cn } from "@/styles/utils"
import { LONG_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

export type GenericDataItemPageTitleProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the title
}

export function GenericDataItemPageTitle(props: GenericDataItemPageTitleProps) {
  const { record } = props

  return <>{record.name}</>
}
GenericDataItemPageTitle.displayName = "GenericDataItemPageTitle"

export type GenericDataItemPageBodyProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the body
}

export function GenericDataItemPageBody(props: GenericDataItemPageBodyProps) {
  const { record } = props

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
    <ItemSheetBody>
      <div className="flex flex-col gap-4">
        <GenericDataItemField propertyName={"name"} value={name} />
        <GenericDataItemField propertyName={"summary"} value={summary} />
        {Object.entries(otherProperties).map(([key, value]) => (
          <GenericDataItemField key={key} propertyName={key} value={value} />
        ))}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger>
              <div className="text-muted-foreground">
                <Typography variant="base-semibold">
                  Additional Properties
                </Typography>
              </div>
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
  )
}
GenericDataItemPageBody.displayName = "GenericDataItemPageBody"

export type GenericDataItemFieldProps = {
  propertyName: string
  value: unknown
} & React.ComponentProps<"div">

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

export type GenericDataItemPageFooterProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the footer if needed
}

export function GenericDataItemPageFooter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _props: GenericDataItemPageFooterProps
) {
  return (
    <ItemSheetFooter>
      <Button variant="outline" className="w-full" asChild>
        <ItemSheetClose>Close</ItemSheetClose>
      </Button>
    </ItemSheetFooter>
  )
}
GenericDataItemPageFooter.displayName = "GenericDataItemPageFooter"
