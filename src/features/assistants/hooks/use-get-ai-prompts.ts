import { QueryClient } from "@tanstack/react-query"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import {
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

export function useGetAiPrompts(assistantId?: string) {
  const { records, ...query } = useVeridaDataRecords({
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    baseSchema: AiPromptBaseSchema,
    filter: assistantId
      ? {
          assistantId,
        }
      : undefined,
    // TODO: Handle pagination
  })

  return {
    savedAiPrompts: records,
    ...query,
  }
}

type PrefetchGetAiPromptsArgs = {
  queryClient: QueryClient
  did: string
  sessionToken: string
  assistantId?: string
}

export async function prefetchGetAiPrompts({
  queryClient,
  did,
  sessionToken,
  assistantId,
}: PrefetchGetAiPromptsArgs) {
  await prefetchVeridaDataRecords({
    queryClient,
    did,
    sessionToken,
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    baseSchema: AiPromptBaseSchema,
    filter: assistantId
      ? {
          assistantId,
        }
      : undefined,
    // TODO: Set pagination
  })
}
