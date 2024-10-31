"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  AssistantsContext,
  AssistantsContextType,
} from "@/features/assistants/contexts/assistants-context"
import { HotloadResult } from "@/features/assistants/types"
import { AssistantChatMessage } from "@/features/assistants/types"
import { hotloadAPI, processUserPrompt } from "@/features/assistants/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida/use-verida"

const logger = Logger.create("assistants")

export type AssistantsProviderProps = {
  children: React.ReactNode
}

/**
 * AssistantsProvider component
 *
 * This component provides the context for the AI assistant functionality.
 * It manages the latest user prompt and assistant reply, processing status, and errors.
 */
export function AssistantsProvider(props: AssistantsProviderProps) {
  const { children } = props
  const { getAccountSessionToken } = useVerida()

  const [userMessage, setUserMessage] = useState<AssistantChatMessage | null>(
    null
  )
  const [assistantMessage, setAssistantMessage] =
    useState<AssistantChatMessage | null>(null)
  const [isProcessingPrompt, setIsProcessingPrompt] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hotload, setHotload] = useState<HotloadResult>({
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
    logger.info("Assistant initialized")
  }, [getAccountSessionToken])

  useEffect(() => {
    initialise().catch((error) => {
      logger.error(error)
      setHotload({ status: "error", progress: 0 })
    })
  }, [initialise])

  const sendPrompt = useCallback(
    async (prompt: string) => {
      logger.info("Sending prompt to assistant")
      setIsProcessingPrompt(true)
      setError(null)
      setUserMessage({
        sender: "user",
        content: prompt,
      })
      setAssistantMessage(null)

      try {
        const sessionToken = await getAccountSessionToken()
        const response = await processUserPrompt(prompt, sessionToken)
        setAssistantMessage({
          sender: "assistant",
          content: response,
        })
        logger.info("Received response from assistant")
      } catch (error) {
        logger.error(error)
        setError("Something went wrong with the assistant")
      } finally {
        setIsProcessingPrompt(false)
      }
    },
    [getAccountSessionToken]
  )

  const value = useMemo<AssistantsContextType>(
    () => ({
      userMessage,
      assistantMessage,
      sendPrompt,
      isProcessingPrompt,
      error,
      hotload,
    }),
    [
      userMessage,
      assistantMessage,
      sendPrompt,
      isProcessingPrompt,
      error,
      hotload,
    ]
  )

  return (
    <AssistantsContext.Provider value={value}>
      {children}
    </AssistantsContext.Provider>
  )
}
AssistantsProvider.displayName = "AssistantsProvider"
