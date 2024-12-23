import { SearchType } from "@/features/data-search/types"

export type DatabaseDefinition = {
  id: string
  type: "user" | "technical"
  title: string
  titlePlural: string
  color: string
  searchType?: SearchType
  databaseVaultName: string
  schemaUrlBase: string
  schemaUrlLatest: string
}
