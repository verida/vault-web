import { useContext } from "react"

import { AssistantPromptDialogContext } from "@/features/assistants/contexts/assistant-prompt-dialog-context"

export function useAssistantPromptDialog() {
  const context = useContext(AssistantPromptDialogContext)
  if (!context) {
    throw new Error(
      "useAssistantPromptDialog must be used within an AssistantPromptDialogProvider"
    )
  }
  return context
}
