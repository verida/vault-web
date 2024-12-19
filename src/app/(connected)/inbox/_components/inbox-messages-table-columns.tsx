import { createColumnHelper } from "@tanstack/react-table"
import { formatDistanceToNow, intlFormat, isDate } from "date-fns"
import { useMemo } from "react"

import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { VeridaInboxMessageRecord } from "@/features/verida-inbox/types"
import {
  SHORT_DATE_FORMAT_OPTIONS,
  SHORT_TIME_FORMAT_OPTIONS,
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const formatedValue = useMemo(() => {
        const date = new Date(value || "")
        if (!isDate(date)) {
          return EMPTY_VALUE_FALLBACK
        }

        const now = new Date()
        const diffInMinutes = Math.floor(
          (now.getTime() - date.getTime()) / 1000 / 60
        )

        // If less than 1 hour ago, show relative time
        if (diffInMinutes < 60) {
          return formatDistanceToNow(date, { addSuffix: true })
        }

        // If same day, show time only
        if (date.toDateString() === now.toDateString()) {
          return intlFormat(date, SHORT_TIME_FORMAT_OPTIONS)
        }

        // Otherwise show date only
        return intlFormat(date, SHORT_DATE_FORMAT_OPTIONS)
      }, [value])

      return formatedValue
    },
  }),
]
