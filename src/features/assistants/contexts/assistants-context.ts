"use client"

import { createContext } from "react"

import {
  AssistantChatMessage,
  HotloadStatus,
} from "@/features/assistants/types"

export type AssistantsContextType = {
  messages: AssistantChatMessage[]
  sendMessage: (message: string) => Promise<void>
  isProcessingMessage: boolean
  error: string | null
  hotload: {
    status: HotloadStatus
    progress: number
  }
}

export const AssistantsContext = createContext<AssistantsContextType | null>(
  null
)
