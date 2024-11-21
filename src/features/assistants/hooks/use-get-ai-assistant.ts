import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import { useVeridaDataRecord } from "@/features/verida-database/hooks/use-verida-data-record"

type UseGetAiAssistantArgs = {
  assistantId: string
}

export function useGetAiAssistant({ assistantId }: UseGetAiAssistantArgs) {
  const { record, ...query } = useVeridaDataRecord({
    databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
    recordId: assistantId,
    baseSchema: AiAssistantBaseSchema,
  })

  return {
    assistant: record,
    ...query,
  }
}
