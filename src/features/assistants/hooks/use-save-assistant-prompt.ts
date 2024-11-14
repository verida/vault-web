import { useCallback } from "react"

import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { SavedPromptBase } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaRecord } from "@/features/verida-database/hooks/use-create-verida-record"
import { UnsavedVeridaRecord } from "@/features/verida-database/types"

export function useSaveAssistantPrompt() {
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createRecordAsync, createRecord, ...mutation } =
    useCreateVeridaRecord<SavedPromptBase>()

  const saveAssistantPrompt = useCallback(
    (promptToSave: UnsavedVeridaRecord<SavedPromptBase>) => {
      return createRecordAsync(
        {
          databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToSave,
        },
        {
          onSuccess: () => {
            toast({
              description: "Saved successfully",
            })
          },
          onError: () => {
            toast({
              description: "Saving failed",
            })
          },
        }
      )
    },
    [createRecordAsync, toast]
  )

  return {
    saveAssistantPrompt,
    ...mutation,
  }
}
