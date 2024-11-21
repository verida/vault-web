"use client"

import { useCallback, useMemo, useState } from "react"

import { ManageAiAssistantDialog } from "@/features/assistants/components/manage-ai-assistant-dialog"
import {
  AiAssistantDialogContext,
  AiAssistantDialogContextType,
  AiAssistantDialogState,
} from "@/features/assistants/contexts/ai-assistant-dialog-context"
import { useCreateAiAssistant } from "@/features/assistants/hooks/use-create-ai-assistant"
import { useDeleteAiAssistant } from "@/features/assistants/hooks/use-delete-ai-assistant"
import { useUpdateAiAssistant } from "@/features/assistants/hooks/use-update-ai-assistant"
import {
  AiAssistantFormData,
  AiAssistantRecord,
} from "@/features/assistants/types"

type AiAssistantDialogProviderProps = {
  children: React.ReactNode
}

export function AiAssistantDialogProvider(
  props: AiAssistantDialogProviderProps
) {
  const { children } = props

  const [dialogState, setDialogState] = useState<AiAssistantDialogState>({
    type: "create",
    isOpen: false,
  })

  const { createAiAssistantAsync } = useCreateAiAssistant()
  const { updateAiAssistantAsync } = useUpdateAiAssistant()
  const { deleteAiAssistantAsync } = useDeleteAiAssistant()

  const openCreateDialog = useCallback(
    (initialData?: Partial<AiAssistantFormData>) => {
      setDialogState({
        type: "create",
        isOpen: true,
        initialData,
      })
    },
    []
  )

  const openEditDialog = useCallback((aiAssistantRecord: AiAssistantRecord) => {
    setDialogState({
      type: "edit",
      isOpen: true,
      initialData: {
        name: aiAssistantRecord.name,
      },
      aiAssistantRecord,
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const handleSubmit = useCallback(
    async (data: AiAssistantFormData) => {
      if (dialogState.type === "create") {
        await createAiAssistantAsync(data)
      } else if (dialogState.aiAssistantRecord) {
        await updateAiAssistantAsync({
          ...dialogState.aiAssistantRecord,
          ...data,
        })
      }
    },
    [createAiAssistantAsync, updateAiAssistantAsync, dialogState]
  )

  const handleDelete = useCallback(async () => {
    if (dialogState.aiAssistantRecord) {
      await deleteAiAssistantAsync(dialogState.aiAssistantRecord._id)
    }
  }, [deleteAiAssistantAsync, dialogState])

  const value: AiAssistantDialogContextType = useMemo(
    () => ({
      dialogState,
      openCreateDialog,
      openEditDialog,
      closeDialog,
    }),
    [dialogState, openCreateDialog, openEditDialog, closeDialog]
  )

  return (
    <AiAssistantDialogContext.Provider value={value}>
      {children}
      <ManageAiAssistantDialog
        type={dialogState.type}
        initialData={dialogState.initialData ?? {}}
        open={dialogState.isOpen}
        onOpenChange={(open) => !open && closeDialog()}
        onSubmit={handleSubmit}
        onDelete={dialogState.type === "edit" ? handleDelete : undefined}
      />
    </AiAssistantDialogContext.Provider>
  )
}
AiAssistantDialogProvider.displayName = "AiAssistantDialogProvider"
