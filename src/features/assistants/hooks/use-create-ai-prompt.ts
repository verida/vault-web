import { useCallback } from "react"

import { AI_PROMPTS_DB_DEF } from "@/features/assistants/constants"
import { AiPromptBaseSchema } from "@/features/assistants/schemas"
import { AiPromptBase } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaRecord } from "@/features/verida-database/hooks/use-create-verida-record"
import { UnsavedVeridaRecord } from "@/features/verida-database/types"

export function useCreateAiPrompt() {
  const { toast } = useToast()

  const { createRecordAsync, createRecord, ...mutation } =
    useCreateVeridaRecord(AiPromptBaseSchema)

  const createAiPrompt = useCallback(
    (promptToSave: UnsavedVeridaRecord<AiPromptBase>) => {
      return createRecord(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToSave,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Prompt saved successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Saving prompt failed",
            })
          },
        }
      )
    },
    [createRecord, toast]
  )

  const createAiPromptAsync = useCallback(
    (promptToSave: UnsavedVeridaRecord<AiPromptBase>) => {
      return createRecordAsync(
        {
          databaseName: AI_PROMPTS_DB_DEF.databaseVaultName,
          record: promptToSave,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Prompt saved successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Saving prompt failed",
            })
          },
        }
      )
    },
    [createRecordAsync, toast]
  )

  return {
    createAiPrompt,
    createAiPromptAsync,
    ...mutation,
  }
}
