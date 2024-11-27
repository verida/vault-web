import { useMemo } from "react"

import {
  AI_ASSISTANTS_DB_DEF,
  MAX_NB_ASSISTANTS,
} from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import {
  PrefetchVeridaDataRecordsArgs,
  UseVeridaDataRecordsArgs,
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

type UseGetAiAssistantsArgs = Pick<
  UseVeridaDataRecordsArgs<typeof AiAssistantBaseSchema>,
  "filter" | "options"
>

export function useGetAiAssistants({
  filter,
  options,
}: UseGetAiAssistantsArgs = {}) {
  const { records, ...query } = useVeridaDataRecords({
    databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
    baseSchema: AiAssistantBaseSchema,
    filter,
    options: {
      ...options,
      limit: options?.limit ?? MAX_NB_ASSISTANTS,
    },
  })

  const sortedRecords = useMemo(() => {
    return records?.sort((a, b) => {
      // Sort by order first if both have order defined
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      // Put records with order before those without
      if (a.order !== undefined) return -1
      if (b.order !== undefined) return 1

      // Fall back to insertedAt if both exist
      if (a.insertedAt && b.insertedAt) {
        return (
          new Date(b.insertedAt).getTime() - new Date(a.insertedAt).getTime()
        )
      }
      // Put records with insertedAt before those without
      if (a.insertedAt) return -1
      if (b.insertedAt) return 1

      return 0
    })
  }, [records])

  return {
    aiAssistants: sortedRecords,
    ...query,
  }
}

type PrefetchAiAssistantsArgs = Omit<
  PrefetchVeridaDataRecordsArgs<typeof AiAssistantBaseSchema>,
  "databaseName" | "baseSchema"
>

export async function prefetchAiAssistants({
  queryClient,
  did,
  sessionToken,
  filter,
  options,
}: PrefetchAiAssistantsArgs) {
  await prefetchVeridaDataRecords({
    queryClient,
    did,
    sessionToken,
    databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
    baseSchema: AiAssistantBaseSchema,
    filter,
    options,
  })
}
