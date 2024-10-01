import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"

import { Typography } from "@/components/typography"
import { VeridaRecord } from "@/features/verida-database"

// TODO: Pass a schema here to dynamically generate the columns
export function getDataRecordsTableColumns<T = Record<string, unknown>>() {
  const columnHelper = createColumnHelper<VeridaRecord<T>>()

  return [
    // columnHelper.accessor((row) => row.icon, {
    //   id: "icon",
    //   meta: {
    //     headerClassName: "w-8 shrink-0",
    //     cellClassName: "w-8 shrink-0",
    //   },
    //   header: "Icon",
    //   cell: (context) => (
    //     <Avatar className="size-8">
    //       <AvatarImage src={context.getValue()} />
    //       <AvatarFallback />
    //     </Avatar>
    //   ),
    // }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      meta: {
        headerClassName: "w-80 shrink-0",
        cellClassName: "w-80 shrink-0",
      },
      header: "Name",
      cell: (context) => (
        <Typography variant="base-regular" className="line-clamp-2">
          {context.renderValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor((row) => row.summary, {
      id: "summary",
      meta: {
        headerClassName: "flex-1",
        cellClassName: "flex-1",
      },
      header: "Summary",
      cell: (context) => (
        <Typography variant="base-regular" className="line-clamp-2">
          {context.renderValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor((row) => row.modifiedAt, {
      id: "modifiedAt",
      meta: {
        headerClassName: "w-40 shrink-0",
        cellClassName: "w-40 shrink-0",
      },
      header: "Modified At",
      cell: (context) => {
        const value = context.getValue()
        if (!value) {
          return (
            <div className="text-muted-foreground">
              <Typography variant="base-regular" className="truncate">
                {context.renderValue()}
              </Typography>
            </div>
          )
        }
        const formattedDate = format(new Date(value), "dd/MM/yyyy HH:mm")
        return (
          <div className="text-muted-foreground">
            <Typography variant="base-regular" className="truncate">
              {formattedDate}
            </Typography>
          </div>
        )
      },
    }),
  ]
}
