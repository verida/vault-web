import { useCallback } from "react"

import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import { AiAssistantRecord } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useUpdateVeridaRecord } from "@/features/verida-database/hooks/use-update-verida-record"

export function useUpdateAiAssistant() {
  const { toast } = useToast()

  const { updateRecord, updateRecordAsync, ...mutation } =
    useUpdateVeridaRecord(AiAssistantBaseSchema)

  const updateAiAssistant = useCallback(
    (promptToUpdate: AiAssistantRecord) => {
      return updateRecord(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          record: promptToUpdate,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant updated successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Updating assistant failed",
            })
          },
        }
      )
    },
    [updateRecord, toast]
  )

  const updateAiAssistantAsync = useCallback(
    (promptToUpdate: AiAssistantRecord) => {
      return updateRecordAsync(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          record: promptToUpdate,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant updated successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Updating assistant failed",
            })
          },
        }
      )
    },
    [updateRecordAsync, toast]
  )

  return {
    updateAiAssistant,
    updateAiAssistantAsync,
    ...mutation,
  }
}
