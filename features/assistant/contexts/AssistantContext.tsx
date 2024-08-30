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

/**
 * AssistantProvider component
 *
 * This component provides the context for the AI assistant functionality.
 * It manages the state of messages, processing status, errors, and hotloading progress.
 */
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
    logger.info("Initialising the assistant")
    if (!commonConfig.PRIVATE_DATA_API_PRIVATE_KEY) {
      logger.warn(
        "PRIVATE_DATA_API_PRIVATE_KEY missing, unable to initializethe assistant"
      )
      return
    }

    setHotload({ status: "loading", progress: 0 })
    hotloadAPI(commonConfig.PRIVATE_DATA_API_PRIVATE_KEY, (progress) => {
      setHotload({ status: "loading", progress })
    })
      .then(() => {
        setHotload({ status: "success", progress: 1 })
        logger.info("Assisant initialized")
      })
      .catch((error) => {
        logger.error(error)
        setHotload({ status: "error", progress: 0 })
      })
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    logger.info("Sending message to assistant")
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
      logger.info("Received response from assistant")
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
