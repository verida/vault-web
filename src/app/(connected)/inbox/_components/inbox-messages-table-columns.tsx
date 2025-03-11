/* eslint-disable react-hooks/rules-of-hooks */
import { createColumnHelper } from "@tanstack/react-table"
import { isDate, isToday } from "date-fns"
import { useCallback, useEffect, useState } from "react"

import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import type { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import {
  formatDateDistanceFromNow,
  formatTimeDistanceFromNow,
} from "@/utils/date"

const columnHelper = createColumnHelper<VeridaInboxMessageRecord>()

export const inboxMessagesTableColumns = [
  columnHelper.accessor((row) => row.sentBy, {
    id: "sentBy",
    header: "From",
    meta: {
      headerClassName: "w-64 shrink-0 pl-5",
    },
  }),
  columnHelper.accessor((row) => row.type, {
    id: "type",
    header: "Type",
    meta: {
      headerClassName: "w-32 shrink-0",
    },
  }),
  columnHelper.accessor((row) => row.message, {
    id: "message",
    header: "Message",
    meta: {
      headerClassName: "flex-1",
    },
  }),
  columnHelper.accessor((row) => row.sentAt, {
    id: "sentAt",
    header: "Received",
    meta: {
      headerClassName: "w-20 shrink-0",
      align: "right",
    },
    cell: (context) => {
      const value = context.getValue()

      const [formattedValue, setFormattedValue] =
        useState<string>(EMPTY_VALUE_FALLBACK)

      const updateFormatedValue = useCallback(() => {
        const date = new Date(value || "")
        if (!isDate(date)) {
          return EMPTY_VALUE_FALLBACK
        }

        if (isToday(date)) {
          setFormattedValue(formatTimeDistanceFromNow(date, { compact: true }))
        } else {
          setFormattedValue(formatDateDistanceFromNow(date))
        }
      }, [value])

      useEffect(() => {
        updateFormatedValue()
        const intervalId = setInterval(updateFormatedValue, 60000) // Update every minute
        return () => clearInterval(intervalId)
      }, [updateFormatedValue])

      return formattedValue
    },
  }),
]
