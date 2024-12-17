import { createColumnHelper } from "@tanstack/react-table"
import { intlFormat, isDate } from "date-fns"
import Link from "next/link"
import { useCallback } from "react"

import { Typography } from "@/components/typography"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { AuthorizedAppRecord } from "@/features/authorized-apps/types"
import { ALL_DATABASE_DEFS } from "@/features/data/constants"
import { VeridaOauthScope } from "@/features/verida-oauth/types"
import { SHORT_DATE_TIME_FORMAT_OPTIONS } from "@/utils/date"

const columnHelper = createColumnHelper<AuthorizedAppRecord>()

export const authorizedAppsTableColumns = [
  columnHelper.accessor((row) => row._id, {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: "Application",
    meta: {
      headerClassName: "w-64 shrink-0",
    },
    cell: (context) => (
      <Typography variant="base-semibold" className="truncate">
        {context.renderValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor((row) => row.url, {
    id: "url",
    header: "URL",
    cell: (context) => {
      const value = context.getValue()

      if (!value) {
        return (
          <div className="text-muted-foreground">
            <Typography variant="base-s-regular" className="truncate">
              {EMPTY_VALUE_FALLBACK}
            </Typography>
          </div>
        )
      }

      // Use URL to get the punycode hostname
      const url = new URL(value)

      return (
        <Link
          href={url.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground underline"
        >
          <Typography variant="base-s-regular" className="truncate">
            {`${url.protocol}//${url.hostname}`}
          </Typography>
        </Link>
      )
    },
  }),
  columnHelper.accessor((row) => row.scopes, {
    id: "scopes",
    header: "Authorizations",
    meta: {
      headerClassName: "flex-1",
    },
    cell: (context) => {
      const value = context.getValue()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const formatScope = useCallback((scope: VeridaOauthScope) => {
        const databaseDef = ALL_DATABASE_DEFS.find(
          (db) => db.databaseVaultName === scope.database
        )

        return (
          <Typography variant="base-regular">
            <span className="capitalize">{scope.operation}</span>{" "}
            {scope.operation === "write" ? "on your" : "your"}{" "}
            <span className="font-semibold lowercase">
              {databaseDef?.titlePlural || scope.database}
            </span>
          </Typography>
        )
      }, [])

      if (!value) {
        return (
          <div className="text-muted-foreground">
            <Typography variant="base-regular" className="truncate">
              {EMPTY_VALUE_FALLBACK}
            </Typography>
          </div>
        )
      }

      return (
        <ul className="flex flex-col gap-0">
          {value.map((scope, index) => (
            <li key={index}>{formatScope(scope)}</li>
          ))}
        </ul>
      )
    },
  }),
  columnHelper.accessor((row) => row.lastAccessedAt, {
    id: "lastAccessedAt",
    header: "Last Used",
    meta: {
      headerClassName: "w-44 shrink-0",
      align: "right",
    },
    cell: (context) => {
      const value = context.getValue()
      const date = new Date(value || "")

      return (
        <div className="text-muted-foreground">
          <Typography variant="base-regular" className="truncate">
            {isDate(date)
              ? intlFormat(date, SHORT_DATE_TIME_FORMAT_OPTIONS)
              : EMPTY_VALUE_FALLBACK}
          </Typography>
        </div>
      )
    },
  }),
]
