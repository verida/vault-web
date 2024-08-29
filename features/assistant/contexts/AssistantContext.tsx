"use client"

import React, { createContext, useCallback, useMemo, useState } from "react"

import { AssistantChatMessage } from "@/features/assistant/types"
import { processUserPrompt } from "@/features/assistant/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("Assistant")

type AssistantContextType = {
  messages: AssistantChatMessage[]
  sendMessage: (message: string) => Promise<void>
  isProcessing: boolean
  error: string | null
}

export const AssistantContext = createContext<AssistantContextType | null>(null)

export type AssistantProviderProps = {
  children: React.ReactNode
}

export function AssistantProvider(props: AssistantProviderProps) {
  const { children } = props

  const [messages, setMessages] = useState<AssistantChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (message: string) => {
    setIsProcessing(true)
    setError(null)

    const newUserMessage: AssistantChatMessage = {
      sender: "user",
      content: message,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])

    try {
      const response = await processUserPrompt(message)

      const newAssistantMessage: AssistantChatMessage = {
        sender: "assistant",
        content: response,
      }

      setMessages((prevMessages) => [...prevMessages, newAssistantMessage])
    } catch (error) {
      logger.error(error)
      setError("Something went wrong with the assistant")
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const value = useMemo<AssistantContextType>(
    () => ({
      messages,
      sendMessage,
      isProcessing,
      error,
    }),
    [messages, sendMessage, isProcessing, error]
  )

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  )
}
