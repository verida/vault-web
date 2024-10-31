"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  AssistantsContext,
  AssistantsContextType,
} from "@/features/assistants/contexts/assistants-context"
import { AssistantChatMessage } from "@/features/assistants/types"
import { hotloadAPI, processUserPrompt } from "@/features/assistants/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida/use-verida"

const logger = Logger.create("assistants")

export type AssistantsProviderProps = {
  children: React.ReactNode
}

/**
 * AssistantProvider component
 *
 * This component provides the context for the AI assistant functionality.
 * It manages the state of messages, processing status, errors, and hotloading progress.
 */
export function AssistantsProvider(props: AssistantsProviderProps) {
  const { children } = props

  const { getAccountSessionToken } = useVerida()

  const [messages, setMessages] = useState<AssistantChatMessage[]>([])
  const [isProcessingMessage, setIsProcessingMessage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hotload, setHotload] = useState<AssistantsContextType["hotload"]>({
    status: "idle",
    progress: 0,
  })

  const initialise = useCallback(async () => {
    logger.info("Initialising the assistant")

    setHotload({ status: "loading", progress: 0 })

    const sessionToken = await getAccountSessionToken()

    await hotloadAPI(sessionToken, (progress) => {
      setHotload({ status: "loading", progress })
    })

    setHotload({ status: "success", progress: 1 })
    logger.info("Assisant initialized")
  }, [getAccountSessionToken])

  useEffect(() => {
    initialise().catch((error) => {
      logger.error(error)
      setHotload({ status: "error", progress: 0 })
    })
  }, [initialise])

  const sendMessage = useCallback(
    async (message: string) => {
      logger.info("Sending message to assistant")
      setIsProcessingMessage(true)
      setError(null)

      const newUserMessage: AssistantChatMessage = {
        sender: "user",
        content: message,
      }

      setMessages((prevMessages) => [...prevMessages, newUserMessage])

      try {
        const sessionToken = await getAccountSessionToken()
        const response = await processUserPrompt(message, sessionToken)

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
        setIsProcessingMessage(false)
      }
    },
    [getAccountSessionToken]
  )

  const value = useMemo<AssistantsContextType>(
    () => ({
      messages,
      sendMessage,
      isProcessingMessage,
      error,
      hotload,
    }),
    [messages, sendMessage, isProcessingMessage, error, hotload]
  )

  return (
    <AssistantsContext.Provider value={value}>
      {children}
    </AssistantsContext.Provider>
  )
}
AssistantsProvider.displayName = "AssistantsProvider"
