"use client"

import { createContext } from "react"

import {
  AssistantChatMessage,
  HotloadResult,
} from "@/features/assistants/types"

export type AssistantsContextType = {
  userMessage: AssistantChatMessage | null
  assistantMessage: AssistantChatMessage | null
  sendPrompt: (prompt: string) => Promise<void>
  isProcessingPrompt: boolean
  error: string | null
  hotload: HotloadResult
}

export const AssistantsContext = createContext<AssistantsContextType | null>(
  null
)
