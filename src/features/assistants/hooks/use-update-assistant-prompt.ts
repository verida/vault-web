import { useCallback } from "react"

import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { SavedPromptBase } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useUpdateVeridaRecord } from "@/features/verida-database/hooks/use-update-verida-record"
import { VeridaRecord } from "@/features/verida-database/types"

export function useUpdateAssistantPrompt() {
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateRecordAsync, updateRecord, ...mutation } =
    useUpdateVeridaRecord<SavedPromptBase>()

  const updateAssistantPrompt = useCallback(
    (promptToUpdate: VeridaRecord<SavedPromptBase>) => {
      return updateRecordAsync(
        {
          databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToUpdate,
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
    [updateRecordAsync, toast]
  )

  return {
    updateAssistantPrompt,
    ...mutation,
  }
}
