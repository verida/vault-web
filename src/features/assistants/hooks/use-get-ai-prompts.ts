import { QueryClient } from "@tanstack/react-query"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import {
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

export function useGetAiPrompts() {
  const { records, ...query } = useVeridaDataRecords({
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    // TODO: Handle pagination
    baseSchema: AiPromptBaseSchema,
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
}

export async function prefetchGetAiPrompts({
  queryClient,
  did,
  sessionToken,
}: PrefetchGetAiPromptsArgs) {
  await prefetchVeridaDataRecords({
    queryClient,
    did,
    sessionToken,
    databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
    // TODO: Set pagination
    baseSchema: AiPromptBaseSchema,
  })
}
