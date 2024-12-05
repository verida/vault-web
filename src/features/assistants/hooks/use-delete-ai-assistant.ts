import { useCallback } from "react"

import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { useToast } from "@/features/toasts/use-toast"
import { useDeleteVeridaRecord } from "@/features/verida-database/hooks/use-delete-verida-record"

export function useDeleteAiAssistant() {
  const { toast } = useToast()

  const { deleteRecord, deleteRecordAsync, ...mutation } =
    useDeleteVeridaRecord()

  const deleteAiAssistant = useCallback(
    (assistantId: string) => {
      return deleteRecord(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          recordId: assistantId,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant deleted successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Deleting assistant failed",
            })
          },
        }
      )
    },
    [deleteRecord, toast]
  )

  const deleteAiAssistantAsync = useCallback(
    (assistantId: string) => {
      return deleteRecordAsync(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          recordId: assistantId,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant deleted successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Deleting assistant failed",
            })
          },
        }
      )
    },
    [deleteRecordAsync, toast]
  )

  return {
    deleteAiAssistant,
    deleteAiAssistantAsync,
    ...mutation,
  }
}
