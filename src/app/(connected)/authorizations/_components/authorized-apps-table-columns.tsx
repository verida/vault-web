import { createColumnHelper } from "@tanstack/react-table"

import { AuthorizedAppRecord } from "@/features/authorized-apps/types"

const columnHelper = createColumnHelper<AuthorizedAppRecord>()

export const authorizedAppsTableColumns = [
  columnHelper.accessor((row) => row._id, {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: "Application",
  }),
  columnHelper.accessor((row) => row.url, {
    id: "url",
    header: "URL",
  }),
  columnHelper.accessor((row) => row.scopes, {
    id: "scopes",
    header: "Authorizations",
  }),
  columnHelper.accessor((row) => row.lastAccessedAt, {
    id: "lastAccessedAt",
    header: "Last Used",
  }),
]
