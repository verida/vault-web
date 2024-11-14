import { QueryClient } from "@tanstack/react-query"

import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { SavedPromptRecord } from "@/features/assistants/types"
import {
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

export function useSavedAssistantPrompts() {
  const { records, ...query } = useVeridaDataRecords<SavedPromptRecord>({
    databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
    // TODO: Handle pagination
  })

  return {
    savedPrompts: records,
    ...query,
  }
}

type PrefetchSavedAssistantPromptsArgs = {
  queryClient: QueryClient
  did: string
  sessionToken: string
}

export async function prefetchSavedAssistantPrompts({
  queryClient,
  did,
  sessionToken,
}: PrefetchSavedAssistantPromptsArgs) {
  await prefetchVeridaDataRecords<SavedPromptRecord>({
    queryClient,
    did,
    sessionToken,
    databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
    // TODO: Set pagination
  })
}
