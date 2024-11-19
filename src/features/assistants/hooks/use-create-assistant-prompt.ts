import { useCallback } from "react"

import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { SavedPromptBaseSchema } from "@/features/assistants/schemas"
import { SavedPromptBase } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaRecord } from "@/features/verida-database/hooks/use-create-verida-record"
import { UnsavedVeridaRecord } from "@/features/verida-database/types"

export function useCreateAssistantPrompt() {
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createRecordAsync, createRecord, ...mutation } =
    useCreateVeridaRecord(SavedPromptBaseSchema)

  const createAssistantPrompt = useCallback(
    (promptToSave: UnsavedVeridaRecord<SavedPromptBase>) => {
      return createRecordAsync(
        {
          databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToSave,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Saved successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Saving failed",
            })
          },
        }
      )
    },
    [createRecordAsync, toast]
  )

  return {
    createAssistantPrompt,
    ...mutation,
  }
}
