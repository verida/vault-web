import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import {
  PrefetchVeridaDataRecordsArgs,
  UseVeridaDataRecordsArgs,
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
    options,
  })

  return {
    savedAiPrompts: records,
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
