"use client"

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { commonConfig } from "@/config/client"
import { AssistantChatMessage } from "@/features/assistant/types"
import { hotloadAPI, processUserPrompt } from "@/features/assistant/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("Assistant")

type HotloadStatus = "idle" | "loading" | "success" | "error"

type AssistantContextType = {
  messages: AssistantChatMessage[]
  sendMessage: (message: string) => Promise<void>
  isProcessing: boolean
  error: string | null
  hotload: {
    status: HotloadStatus
    progress: number
  }
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
  const [hotload, setHotload] = useState<AssistantContextType["hotload"]>({
    status: "idle",
    progress: 0,
  })

  useEffect(() => {
    if (commonConfig.PRIVATE_DATA_API_PRIVATE_KEY) {
      setHotload({ status: "loading", progress: 0 })
      hotloadAPI(commonConfig.PRIVATE_DATA_API_PRIVATE_KEY, (progress) => {
        setHotload({ status: "loading", progress })
      })
        .then(() => {
          setHotload({ status: "success", progress: 1 })
        })
        .catch((error) => {
          logger.error(error)
          setHotload({ status: "error", progress: 0 })
          setError(
            "Failed to initialize the assistant. Please try again later."
          )
        })
    }
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    setIsProcessing(true)
    setError(null)

    const newUserMessage: AssistantChatMessage = {
      sender: "user",
      content: message,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])

    try {
      const response = await processUserPrompt(
        message,
        commonConfig.PRIVATE_DATA_API_PRIVATE_KEY
      )

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
      hotload,
    }),
    [messages, sendMessage, isProcessing, error, hotload]
  )

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  )
}
