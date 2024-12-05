import { useCallback } from "react"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import { AiPromptRecord } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import {
  UseUpdateVeridaRecordOptions,
  useUpdateVeridaRecord,
} from "@/features/verida-database/hooks/use-update-verida-record"

export type UseUpdateAiPromptOptions = UseUpdateVeridaRecordOptions

export function useUpdateAiPrompt(options: UseUpdateAiPromptOptions = {}) {
  const { toast } = useToast()

  const { updateRecordAsync, updateRecord, ...mutation } =
    useUpdateVeridaRecord(AiPromptBaseSchema, options)

  const updateAiPrompt = useCallback(
    (promptToUpdate: AiPromptRecord) => {
      return updateRecord(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToUpdate,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Prompt updated successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Updating prompt failed",
            })
          },
        }
      )
    },
    [updateRecord, toast]
  )

  const updateAiPromptAsync = useCallback(
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
              description: "Prompt updated successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Updating prompt failed",
            })
          },
        }
      )
    },
    [updateRecordAsync, toast]
  )

  return {
    updateAiPrompt,
    updateAiPromptAsync,
    ...mutation,
  }
}
