import { PaginationState } from "@tanstack/react-table"
import {
  createParser,
  parseAsInteger,
  parseAsNumberLiteral,
  useQueryStates,
} from "nuqs"

import {
  DATA_TABLE_PAGINATION_SIZES,
  DATA_TABLE_PAGINATION_SIZE_DEFAULT,
} from "@/features/data-table/constants"

const pageIndexParser = createParser({
  parse: (query) => {
    const page = parseAsInteger.parse(query)
    return page === null ? null : page - 1
  },
  serialize: (value) => {
    return parseAsInteger.serialize(value + 1)
  },
})

type PaginationUrlKeys = {
  pageIndex: string
  pageSize: string
}

const defaultPaginationUrlKeys: PaginationUrlKeys = {
  pageIndex: "page",
  pageSize: "pageSize",
}

const paginationSizeOptions = DATA_TABLE_PAGINATION_SIZES.map(
  (size) => size.value
)

type UseDataTableStateOptions = {
  paginationUrlKeys?: PaginationUrlKeys
  paginationDefaults?: PaginationState
  paginationSizeOptions?: number[]
  paginationHistory?: "push" | "replace"
  paginationScroll?: boolean

  // TODO: Add support for sorting and filtering
}

export function useDataTableState(options?: UseDataTableStateOptions) {
  const paginationParsers = {
    pageIndex: pageIndexParser.withDefault(
      options?.paginationDefaults?.pageIndex ?? 0
    ),
    pageSize: parseAsNumberLiteral(
      options?.paginationSizeOptions ?? paginationSizeOptions
    ).withDefault(
      options?.paginationDefaults?.pageSize ??
        DATA_TABLE_PAGINATION_SIZE_DEFAULT
    ),
  }

  const [pagination, setPagination] = useQueryStates(paginationParsers, {
    urlKeys: options?.paginationUrlKeys ?? defaultPaginationUrlKeys,
    history: options?.paginationHistory ?? "push",
    scroll: options?.paginationScroll ?? true,
  })

  return { pagination, setPagination }
}
