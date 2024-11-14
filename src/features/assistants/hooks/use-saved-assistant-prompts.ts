import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { SavedPromptRecord } from "@/features/assistants/types"
import { useVeridaDataRecords } from "@/features/verida-database/hooks/use-verida-data-records"

export function useSavedAssistantPrompts() {
  const { records, ...query } = useVeridaDataRecords<SavedPromptRecord>({
    databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
  })

  return {
    savedPrompts: records,
    ...query,
  }
}
