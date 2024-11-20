import { useCallback } from "react"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import { AiPromptRecord } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useUpdateVeridaRecord } from "@/features/verida-database/hooks/use-update-verida-record"

export function useUpdateAssistantPrompt() {
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateRecordAsync, updateRecord, ...mutation } =
    useUpdateVeridaRecord(AiPromptBaseSchema)

  const updateAssistantPrompt = useCallback(
    (promptToUpdate: AiPromptRecord) => {
      return updateRecordAsync(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToUpdate,
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
    [updateRecordAsync, toast]
  )

  return {
    updateAssistantPrompt,
    ...mutation,
  }
}
