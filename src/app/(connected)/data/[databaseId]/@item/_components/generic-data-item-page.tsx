"use client"

import { intlFormat, isDate } from "date-fns"
import { useCallback } from "react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaRecord } from "@/features/verida-database/types"
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

  // TODO: Extract the know fields from the record and render them with their
  // proper type(e.g.date, object, etc.) as well as put them into a collapsible
  // "advanced" section

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
    <div className="flex flex-col gap-4">
      {Object.entries(record).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-1">
          <div className="text-muted-foreground">
            <Typography variant="base-semibold">{key}</Typography>
          </div>
          <Typography variant="base-regular" className="break-words">
            {formatValue(value, key)}
          </Typography>
        </div>
      ))}
    </div>
  )
}
GenericDataItemPageBody.displayName = "GenericDataItemPageBody"

export type GenericDataItemPageFooterProps = {
  record: VeridaRecord
  // TODO: Add schema to the props to use it to render the footer
  onClose: () => void
}

export function GenericDataItemPageFooter(
  props: GenericDataItemPageFooterProps
) {
  const { onClose } = props

  return (
    <Button variant="outline" className="w-full" onClick={onClose}>
      Close
    </Button>
  )
}
GenericDataItemPageFooter.displayName = "GenericDataItemPageFooter"
