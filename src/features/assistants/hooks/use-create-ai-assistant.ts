import { useCallback } from "react"

import { AI_ASSISTANTS_DB_DEF } from "@/features/assistants/constants"
import { AiAssistantBaseSchema } from "@/features/assistants/schemas"
import { AiAssistantBase } from "@/features/assistants/types"
import { useToast } from "@/features/toasts/use-toast"
import { useCreateVeridaRecord } from "@/features/verida-database/hooks/use-create-verida-record"
import { UnsavedVeridaRecord } from "@/features/verida-database/types"

export function useCreateAiAssistant() {
  const { toast } = useToast()

  const { createRecord, createRecordAsync, ...mutation } =
    useCreateVeridaRecord(AiAssistantBaseSchema)

  const createAiAssistant = useCallback(
    (assistantToSave: UnsavedVeridaRecord<AiAssistantBase>) => {
      return createRecord(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          record: assistantToSave,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant created successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Creating assistant failed",
            })
          },
        }
      )
    },
    [createRecord, toast]
  )

  const createAiAssistantAsync = useCallback(
    (assistantToSave: UnsavedVeridaRecord<AiAssistantBase>) => {
      return createRecordAsync(
        {
          databaseName: AI_ASSISTANTS_DB_DEF.databaseVaultName,
          record: assistantToSave,
        },
        {
          onSuccess: () => {
            toast({
              variant: "success",
              description: "Assistant created successfully",
            })
          },
          onError: () => {
            toast({
              variant: "error",
              description: "Creating assistant failed",
            })
          },
        }
      )
    },
    [createRecordAsync, toast]
  )

  return {
    createAiAssistant,
    createAiAssistantAsync,
    ...mutation,
  }
}
