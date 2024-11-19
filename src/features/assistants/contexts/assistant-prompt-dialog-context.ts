import { createContext } from "react"

import { PromptFormData } from "@/app/(connected)/assistant/_components/assistant-manage-prompt-dialog"
import { SavedPromptRecord } from "@/features/assistants/types"

export type AssistantPromptDialogState = {
  type: "create" | "edit"
  isOpen: boolean
  initialData?: Partial<PromptFormData>
  savedPrompt?: SavedPromptRecord
}

export type AssistantPromptDialogContextType = {
  dialogState: AssistantPromptDialogState
  openSaveDialog: (initialData?: Partial<PromptFormData>) => void
  openEditDialog: (savedPrompt: SavedPromptRecord) => void
  closeDialog: () => void
}

export const AssistantPromptDialogContext =
  createContext<AssistantPromptDialogContextType | null>(null)
