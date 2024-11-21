import { createContext } from "react"

import {
  AiAssistantHotloadResult,
  AiAssistantOutput,
  AiPromptInput,
} from "@/features/assistants/types"

export type AssistantsContextType = {
  aiPromptInput: AiPromptInput | null
  aiAssistantOutput: AiAssistantOutput | null
  processAiPromptInput: () => Promise<void>
  setAndProcessAiPromptInput: (aiPromptInput: AiPromptInput) => Promise<void>
  updateAiPrompt: (prompt: string) => void
  clearAiPromptInput: () => void
  clearAiAssistantOutput: () => void
  isProcessing: boolean
  error: string | null
  hotload: AiAssistantHotloadResult
  promptSearchValue: string
  setPromptSearchValue: (value: string) => void
}

export const AssistantsContext = createContext<AssistantsContextType | null>(
  null
)
