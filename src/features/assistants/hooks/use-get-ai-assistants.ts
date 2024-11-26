import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
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

    options,
  })

  return {
    aiAssistants: records,
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
