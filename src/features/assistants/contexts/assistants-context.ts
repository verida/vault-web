import { Dispatch, SetStateAction, createContext } from "react"

import {
  AiAssistantHotloadResult,
  AiAssistantOutput,
  AiPromptInput,
} from "@/features/assistants/types"

export type AssistantsContextType = {
  selectedAiAssistant: string
  setSelectedAiAssistant: (assistantId: string) => void
  aiPromptInput: AiPromptInput | null
  aiAssistantOutput: AiAssistantOutput | null
  processAiPromptInput: () => Promise<void>
  setAndProcessAiPromptInput: (aiPromptInput: AiPromptInput) => Promise<void>
  updateAiPromptInput: Dispatch<SetStateAction<AiPromptInput | null>>
  clearAiPromptInput: () => void
  clearAiAssistantOutput: () => void
  error: string | null
  hotload: AiAssistantHotloadResult
  promptSearchValue: string
  setPromptSearchValue: (value: string) => void
}

export const AssistantsContext = createContext<AssistantsContextType | null>(
  null
)
