"use client"

import { useCallback, useMemo, useState } from "react"

import { featureFlags } from "@/config/features"
import { ManageAiPromptDialog } from "@/features/assistants/components/manage-ai-prompt-dialog"
import {
  AiPromptDialogContext,
  AiPromptDialogContextType,
  AiPromptDialogState,
} from "@/features/assistants/contexts/ai-prompt-dialog-context"
import { useCreateAiPrompt } from "@/features/assistants/hooks/use-create-ai-prompt"
import { useDeleteAiPrompt } from "@/features/assistants/hooks/use-delete-ai-prompt"
import { useUpdateAiPrompt } from "@/features/assistants/hooks/use-update-ai-prompt"
import { AiPromptFormData, AiPromptRecord } from "@/features/assistants/types"

type AiPromptDialogProviderProps = {
  children: React.ReactNode
}

export function AiPromptDialogProvider(props: AiPromptDialogProviderProps) {
  const { children } = props

  const [dialogState, setDialogState] = useState<AiPromptDialogState>({
    type: "create",
    isOpen: false,
  })

  const { createAiPrompt: createAssistantPrompt } = useCreateAiPrompt()
  const { updateAiPrompt: updateAssistantPrompt } = useUpdateAiPrompt()
  const { deleteAiPrompt: deleteAssistantPrompt } = useDeleteAiPrompt()

  const openSaveDialog = useCallback(
    (initialData?: Partial<AiPromptFormData>) => {
      setDialogState({
        type: "create",
        isOpen: true,
        initialData,
      })
    },
    []
  )

  const openEditDialog = useCallback((aiPromptRecord: AiPromptRecord) => {
    setDialogState({
      type: "edit",
      isOpen: true,
      initialData: {
        name: aiPromptRecord.name,
        prompt: aiPromptRecord.prompt,
      },
      aiPromptRecord,
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const handleSubmit = useCallback(
    async (data: AiPromptFormData) => {
      if (dialogState.type === "create") {
        await createAssistantPrompt({
          assistantId: "", // TODO: Get from form data
          name: data.name,
          prompt: data.prompt,
        })
      } else if (dialogState.aiPromptRecord) {
        await updateAssistantPrompt({
          ...dialogState.aiPromptRecord,
          name: data.name,
          prompt: data.prompt,
        })
      }
    },
    [createAssistantPrompt, updateAssistantPrompt, dialogState]
  )

  const handleDelete = useCallback(async () => {
    if (dialogState.aiPromptRecord) {
      await deleteAssistantPrompt(dialogState.aiPromptRecord._id)
    }
  }, [deleteAssistantPrompt, dialogState])

  const value: AiPromptDialogContextType = useMemo(
    () => ({
      dialogState,
      openSaveDialog,
      openEditDialog,
      closeDialog,
    }),
    [dialogState, openSaveDialog, openEditDialog, closeDialog]
  )

  return (
    <AiPromptDialogContext.Provider value={value}>
      {children}
      {featureFlags.assistant.userPrompts.enabled ? (
        <ManageAiPromptDialog
          type={dialogState.type}
          initialData={dialogState.initialData ?? {}}
          open={dialogState.isOpen}
          onOpenChange={(open) => !open && closeDialog()}
          onSubmit={handleSubmit}
          onDelete={dialogState.type === "edit" ? handleDelete : undefined}
        />
      ) : null}
    </AiPromptDialogContext.Provider>
  )
}
AiPromptDialogProvider.displayName = "AiPromptDialogProvider"
