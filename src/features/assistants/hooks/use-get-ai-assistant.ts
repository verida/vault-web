import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import type { UseQueryOptions } from "@/features/queries/types"
import { useVeridaDataRecord } from "@/features/verida-database/hooks/use-verida-data-record"

type UseGetAiAssistantArgs = {
  assistantId: string
}

export function useGetAiAssistant(
  { assistantId }: UseGetAiAssistantArgs,
  queryOptions?: UseQueryOptions
) {
  const { record, ...query } = useVeridaDataRecord(
    {
      databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
      recordId: assistantId,
      baseSchema: AiAssistantBaseSchema,
    },
    queryOptions
  )

  return {
    aiAssistant: record,
    ...query,
  }
}
