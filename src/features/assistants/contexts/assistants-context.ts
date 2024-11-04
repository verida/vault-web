import { createContext } from "react"

import {
  AssistantOutput,
  AssistantUserInput,
  HotloadResult,
} from "@/features/assistants/types"

export type AssistantsContextType = {
  userInput: AssistantUserInput | null
  assistantOutput: AssistantOutput | null
  processUserInput: () => Promise<void>
  updateUserPrompt: (userPrompt: string) => void
  clearUserInput: () => void
  clearAssistantOutput: () => void
  isProcessing: boolean
  error: string | null
  hotload: HotloadResult
}

export const AssistantsContext = createContext<AssistantsContextType | null>(
  null
)
