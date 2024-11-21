"use client"

import { useQueryClient } from "@tanstack/react-query"
import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  AssistantsContext,
  AssistantsContextType,
} from "@/features/assistants/contexts/assistants-context"
import { prefetchGetAiPrompts } from "@/features/assistants/hooks/use-get-ai-prompts"
import { AssistantUserInput, HotloadResult } from "@/features/assistants/types"
import { AssistantOutput } from "@/features/assistants/types"
import {
  hotloadAPI,
  sendUserInputToAssistant,
} from "@/features/assistants/utils"
import { Logger } from "@/features/telemetry"
import { useVerida } from "@/features/verida/hooks/use-verida"

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
  const { did, getAccountSessionToken } = useVerida()

  const queryClient = useQueryClient()

  const [userInput, setUserInput] = useState<AssistantUserInput | null>(null)
  const [assistantOutput, setAssistantOutput] =
    useState<AssistantOutput | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hotload, setHotload] = useState<HotloadResult>({
    status: "idle",
    progress: 0,
  })
  const [promptSearchValue, setPromptSearchValue] = useState("")

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

  useEffect(() => {
    if (!did) {
      return
    }

    getAccountSessionToken()
      .then((sessionToken) => {
        prefetchGetAiPrompts({
          queryClient,
          did,
          sessionToken,
        })
      })
      .catch((error) => {
        logger.error(
          new Error("Error prefetching saved assistant prompts", {
            cause: error,
          })
        )
      })
  }, [getAccountSessionToken, queryClient, did])

  const _processUserInput = useCallback(
    async (userInput: AssistantUserInput) => {
      if (isProcessing) {
        return
      }

      logger.info("Sending user input to assistant")
      setIsProcessing(true)
      setError(null)
      setAssistantOutput(null)

      try {
        const sessionToken = await getAccountSessionToken()
        const result = await sendUserInputToAssistant(userInput, sessionToken)
        setAssistantOutput(result)
        logger.info("Received response from assistant")
      } catch (error) {
        logger.error(error)
        // TODO: Analyse error and set appropriate error message
        setError("Something went wrong with the assistant")
      } finally {
        setIsProcessing(false)
      }
    },
    [getAccountSessionToken, isProcessing]
  )

  const processUserInput = useCallback(async () => {
    if (!userInput?.prompt) {
      return
    }
    await _processUserInput(userInput)
  }, [userInput, _processUserInput])

  const setAndProcessUserInput = useCallback(
    async (userInput: AssistantUserInput) => {
      setUserInput(userInput)
      await _processUserInput(userInput)
    },
    [_processUserInput]
  )

  const updateUserPrompt = useCallback((userPrompt: string) => {
    setUserInput((prev) => ({
      ...prev,
      prompt: userPrompt,
    }))
  }, [])

  const clearUserInput = useCallback(() => {
    setUserInput(null)
  }, [])

  const clearAssistantOutput = useCallback(() => {
    setAssistantOutput(null)
  }, [])

  const value = useMemo<AssistantsContextType>(
    () => ({
      userInput,
      assistantOutput,
      processUserInput,
      setAndProcessUserInput,
      updateUserPrompt,
      clearUserInput,
      clearAssistantOutput,
      isProcessing,
      error,
      hotload,
      promptSearchValue,
      setPromptSearchValue,
    }),
    [
      userInput,
      assistantOutput,
      processUserInput,
      setAndProcessUserInput,
      updateUserPrompt,
      clearUserInput,
      clearAssistantOutput,
      isProcessing,
      error,
      hotload,
      promptSearchValue,
      setPromptSearchValue,
    ]
  )

  return (
    <AssistantsContext.Provider value={value}>
      {children}
    </AssistantsContext.Provider>
  )
}
AssistantsProvider.displayName = "AssistantsProvider"
