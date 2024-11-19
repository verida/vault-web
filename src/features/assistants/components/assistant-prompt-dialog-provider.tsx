"use client"

import { useCallback, useMemo, useState } from "react"

import {
  AssistantManagePromptDialog,
  PromptFormData,
} from "@/app/(connected)/assistant/_components/assistant-manage-prompt-dialog"
import {
  AssistantPromptDialogContext,
  AssistantPromptDialogState,
} from "@/features/assistants/contexts/assistant-prompt-dialog-context"
import { useCreateAssistantPrompt } from "@/features/assistants/hooks/use-create-assistant-prompt"
import { useDeleteAssistantPrompt } from "@/features/assistants/hooks/use-delete-assistant-prompt"
import { useUpdateAssistantPrompt } from "@/features/assistants/hooks/use-update-assistant-prompt"
import { SavedPromptRecord } from "@/features/assistants/types"

type AssistantPromptDialogProviderProps = {
  children: React.ReactNode
}

export function AssistantPromptDialogProvider(
  props: AssistantPromptDialogProviderProps
) {
  const { children } = props

  const [dialogState, setDialogState] = useState<AssistantPromptDialogState>({
    type: "create",
    isOpen: false,
  })

  const { createAssistantPrompt } = useCreateAssistantPrompt()
  const { updateAssistantPrompt } = useUpdateAssistantPrompt()
  const { deleteAssistantPrompt } = useDeleteAssistantPrompt()

  const openSaveDialog = useCallback(
    (initialData?: Partial<PromptFormData>) => {
      setDialogState({
        type: "create",
        isOpen: true,
        initialData,
      })
    },
    []
  )

  const openEditDialog = useCallback((savedPrompt: SavedPromptRecord) => {
    setDialogState({
      type: "edit",
      isOpen: true,
      initialData: {
        name: savedPrompt.name,
        prompt: savedPrompt.prompt,
      },
      savedPrompt,
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const handleSubmit = useCallback(
    async (data: PromptFormData) => {
      if (dialogState.type === "create") {
        await createAssistantPrompt({
          name: data.name,
          prompt: data.prompt,
        })
      } else if (dialogState.savedPrompt) {
        await updateAssistantPrompt({
          ...dialogState.savedPrompt,
          name: data.name,
          prompt: data.prompt,
        })
      }
    },
    [createAssistantPrompt, updateAssistantPrompt, dialogState]
  )

  const handleDelete = useCallback(async () => {
    if (dialogState.savedPrompt) {
      await deleteAssistantPrompt(dialogState.savedPrompt._id)
    }
  }, [deleteAssistantPrompt, dialogState])

  const value = useMemo(
    () => ({
      dialogState,
      openSaveDialog,
      openEditDialog,
      closeDialog,
    }),
    [dialogState, openSaveDialog, openEditDialog, closeDialog]
  )

  return (
    <AssistantPromptDialogContext.Provider value={value}>
      {children}
      <AssistantManagePromptDialog
        type={dialogState.type}
        initialData={dialogState.initialData ?? {}}
        open={dialogState.isOpen}
        onOpenChange={(open) => !open && closeDialog()}
        onSubmit={handleSubmit}
        onDelete={dialogState.type === "edit" ? handleDelete : undefined}
      />
    </AssistantPromptDialogContext.Provider>
  )
}
AssistantPromptDialogProvider.displayName = "AssistantPromptDialogProvider"
