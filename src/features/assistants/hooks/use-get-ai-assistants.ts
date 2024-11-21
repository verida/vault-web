import { QueryClient } from "@tanstack/react-query"

import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import {
  prefetchVeridaDataRecords,
  useVeridaDataRecords,
} from "@/features/verida-database/hooks/use-verida-data-records"

export function useGetAiAssistants() {
  const { records, ...query } = useVeridaDataRecords({
    databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
    // TODO: Handle pagination
    baseSchema: AiAssistantBaseSchema,
  })

  return {
    savedPrompts: records,
    ...query,
  }
}

type PrefetchAiAssistantsArgs = {
  queryClient: QueryClient
  did: string
  sessionToken: string
}

export async function prefetchAiAssistants({
  queryClient,
  did,
  sessionToken,
}: PrefetchAiAssistantsArgs) {
  await prefetchVeridaDataRecords({
    queryClient,
    did,
    sessionToken,
    databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
    // TODO: Set pagination
    baseSchema: AiAssistantBaseSchema,
  })
}
