import { useMemo } from "react"

import {
  AI_PROMPTS_DB_DEF,
  MAX_NB_PROMPTS_PER_ASSISTANT,
} from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import {
  type PrefetchVeridaDataRecordsArgs,
  type UseVeridaDataRecordsArgs,
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

type UseGetAiPromptsArgs = Pick<
  UseVeridaDataRecordsArgs<typeof AiPromptBaseSchema>,
  "filter" | "options"
>

export function useGetAiPrompts({ filter, options }: UseGetAiPromptsArgs = {}) {
  const { records, ...query } = useVeridaDataRecords({
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    baseSchema: AiPromptBaseSchema,
    filter,
    options: {
      ...options,
      limit: options?.limit ?? MAX_NB_PROMPTS_PER_ASSISTANT,
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
    aiPrompts: sortedRecords,
    ...query,
  }
}

type PrefetchGetAiPromptsArgs = Omit<
  PrefetchVeridaDataRecordsArgs<typeof AiPromptBaseSchema>,
  "databaseName" | "baseSchema"
>

export async function prefetchGetAiPrompts({
  queryClient,
  did,
  sessionToken,
  filter,
  options,
}: PrefetchGetAiPromptsArgs) {
  await prefetchVeridaDataRecords({
    queryClient,
    did,
    sessionToken,
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    baseSchema: AiPromptBaseSchema,
    filter,
    options,
  })
}
