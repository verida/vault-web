import { useCallback } from "react"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { useToast } from "@/features/toasts/use-toast"
import { useDeleteVeridaRecord } from "@/features/verida-database/hooks/use-delete-verida-record"

export function useDeleteAiPrompt() {
  const { toast } = useToast()

  const { deleteRecord, deleteRecordAsync, ...mutation } =
    useDeleteVeridaRecord()

  const deleteAiPrompt = useCallback(
    (promptId: string) => {
      return deleteRecord(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          recordId: promptId,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Prompt deleted successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Deleting prompt failed",
            })
          },
        }
      )
    },
    [deleteRecord, toast]
  )

  const deleteAiPromptAsync = useCallback(
    (promptId: string) => {
      return deleteRecordAsync(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          recordId: promptId,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Prompt deleted successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Deleting prompt failed",
            })
          },
        }
      )
    },
    [deleteRecordAsync, toast]
  )

  return {
    deleteAiPrompt,
    deleteAiPromptAsync,
    ...mutation,
  }
}
