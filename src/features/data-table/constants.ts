import { DataTablePaginationSizeValue } from "@/features/data-table/types"

export const DATA_TABLE_PAGINATION_SIZE_DEFAULT = 10

export const DATA_TABLE_PAGINATION_SIZES: DataTablePaginationSizeValue[] = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
] as const
