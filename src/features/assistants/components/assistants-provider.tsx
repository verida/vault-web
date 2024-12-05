"use client"

import { useQueryClient } from "@tanstack/react-query"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useLocalStorage } from "usehooks-ts"

import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import {
  AssistantsContext,
  AssistantsContextType,
} from "@/features/assistants/contexts/assistants-context"
import { prefetchGetAiPrompts } from "@/features/assistants/hooks/use-get-ai-prompts"
import {
  AiAssistantHotloadResult,
  AiAssistantOutput,
  AiPromptInput,
} from "@/features/assistants/types"
import {
  hotloadAPI,
  sendAiPromptInputToAssistant,
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

  const [selectedAiAssistant, setSelectedAiAssistant] = useLocalStorage(
    "verida-vault-selectedAiAssistant",
    DEFAULT_ASSISTANT._id,
    {
      initializeWithValue: true,
    }
  )
  const [aiPromptInput, setAiPromptInput] = useState<AiPromptInput | null>(null)
  const [aiAssistantOutput, setAiAssistantOutput] =
    useState<AiAssistantOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hotload, setHotload] = useState<AiAssistantHotloadResult>({
    status: "idle",
    progress: 0,
  })
  const [promptSearchValue, setPromptSearchValue] = useState("")

  const initialise = useCallback(async () => {
    logger.info("Initialising the assistant")
    setHotload({ status: "loading", progress: 0 })

    const sessionToken = await getAccountSessionToken()

    await hotloadAPI(sessionToken, (progress, dataCurrentlyLoading) => {
      setHotload({ status: "loading", progress, dataCurrentlyLoading })
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
          filter: {
            assistantId: selectedAiAssistant,
          },
        })
      })
      .catch((error) => {
        logger.error(
          new Error("Error prefetching saved assistant prompts", {
            cause: error,
          })
        )
      })
  }, [getAccountSessionToken, selectedAiAssistant, queryClient, did])

  const processInput = useCallback(
    async (input: AiPromptInput) => {
      if (aiAssistantOutput?.status === "processing") {
        return
      }

      if (!input.prompt) {
        return
      }

      logger.info("Sending user input to assistant")
      setError(null)
      setAiAssistantOutput({
        assistantId: input.assistantId,
        status: "processing",
      })

      try {
        const sessionToken = await getAccountSessionToken()
        const result = await sendAiPromptInputToAssistant(
          {
            ...input,
            assistantId: selectedAiAssistant,
          },
          sessionToken
        )
        setAiAssistantOutput(result)
      } catch (error) {
        logger.error(error)
        // TODO: Analyse error and set appropriate error message
        setError("Something went wrong with the assistant")
        setAiAssistantOutput(null)
      }
    },
    [getAccountSessionToken, aiAssistantOutput, selectedAiAssistant]
  )

  const processAiPromptInput = useCallback(async () => {
    if (!aiPromptInput) {
      return
    }
    await processInput(aiPromptInput)
  }, [aiPromptInput, processInput])

  const setAndProcessAiPromptInput = useCallback(
    async (input: AiPromptInput) => {
      setAiPromptInput(input)
      await processInput(input)
    },
    [processInput]
  )

  const clearAiPromptInput = useCallback(() => {
    setAiPromptInput(null)
  }, [])

  const clearAiAssistantOutput = useCallback(() => {
    setAiAssistantOutput(null)
  }, [])

  const value = useMemo<AssistantsContextType>(
    () => ({
      selectedAiAssistant,
      setSelectedAiAssistant,
      aiPromptInput,
      aiAssistantOutput,
      processAiPromptInput,
      setAndProcessAiPromptInput,
      updateAiPromptInput: setAiPromptInput,
      clearAiPromptInput,
      clearAiAssistantOutput,
      error,
      hotload,
      promptSearchValue,
      setPromptSearchValue,
    }),
    [
      selectedAiAssistant,
      setSelectedAiAssistant,
      aiPromptInput,
      aiAssistantOutput,
      processAiPromptInput,
      setAndProcessAiPromptInput,
      setAiPromptInput,
      clearAiPromptInput,
      clearAiAssistantOutput,
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
