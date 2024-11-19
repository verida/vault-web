import { useCallback } from "react"

import { SAVED_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { useToast } from "@/features/toasts/use-toast"
import { useDeleteVeridaRecord } from "@/features/verida-database/hooks/use-delete-verida-record"

export function useDeleteAssistantPrompt() {
  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { deleteRecord, deleteRecordAsync, ...mutation } =
    useDeleteVeridaRecord()

  const deleteAssistantPrompt = useCallback(
    (promptId: string) => {
      return deleteRecordAsync(
        {
          databaseName: SAVED_PROMPTS_DB_DEF.databaseVaultName,
          recordId: promptId,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Deleted successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Deleting failed",
            })
          },
        }
      )
    },
    [deleteRecordAsync, toast]
  )

  return {
    deleteAssistantPrompt,
    ...mutation,
  }
}
