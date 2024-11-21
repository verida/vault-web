import { createContext } from "react"

import { PromptFormData } from "@/app/(connected)/assistant/_components/assistant-manage-prompt-dialog"
import { AiPromptRecord } from "@/features/assistants/types"

export type AiPromptDialogState = {
  type: "create" | "edit"
  isOpen: boolean
  initialData?: Partial<PromptFormData>
  savedPrompt?: AiPromptRecord
}

export type AiPromptDialogContextType = {
  dialogState: AiPromptDialogState
  openSaveDialog: (initialData?: Partial<PromptFormData>) => void
  openEditDialog: (savedPrompt: AiPromptRecord) => void
  closeDialog: () => void
}

export const AiPromptDialogContext =
  createContext<AiPromptDialogContextType | null>(null)
