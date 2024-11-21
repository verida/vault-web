import { createContext } from "react"

import { AiPromptFormData, AiPromptRecord } from "@/features/assistants/types"

export type AiPromptDialogState = {
  type: "create" | "edit"
  isOpen: boolean
  initialData?: Partial<AiPromptFormData>
  savedPrompt?: AiPromptRecord
}

export type AiPromptDialogContextType = {
  dialogState: AiPromptDialogState
  openSaveDialog: (initialData?: Partial<AiPromptFormData>) => void
  openEditDialog: (savedPrompt: AiPromptRecord) => void
  closeDialog: () => void
}

export const AiPromptDialogContext =
  createContext<AiPromptDialogContextType | null>(null)
