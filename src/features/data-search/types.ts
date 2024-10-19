import { z } from "zod"

import { SearchTypeSchema } from "@/features/data-search/schemas"

export type SearchType = z.infer<typeof SearchTypeSchema>

export type SearchDataArgs = {
  key?: string
  searchValue: string
  limit?: number
  minResultsPerType?: number
  searchTypes?: SearchType[]
}

export type SearchDataResult = {
  id: string
  name: string
  databaseId: string
}
