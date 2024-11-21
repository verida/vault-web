"use client"

import React, { useMemo } from "react"

import { Typography } from "@/components/typography"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"

export type AssistantSelectorProps = {
  assistantId: string
} & React.ComponentProps<"div">

export function AssistantSelector(props: AssistantSelectorProps) {
  const { assistantId, ...divProps } = props

  const { aiAssistants } = useGetAiAssistants()

  const currentAssistant = useMemo(() => {
    return (aiAssistants?.find(
      (aiAssistant) => aiAssistant._id === assistantId
    ) ?? assistantId === DEFAULT_ASSISTANT._id)
      ? DEFAULT_ASSISTANT
      : null
  }, [aiAssistants, assistantId])

  // TODO: Implement the actual selector

  return (
    <div {...divProps}>
      <Typography variant="heading-3">
        {currentAssistant?.name ?? "AI Assistant"}
      </Typography>
    </div>
  )
}
AssistantSelector.displayName = "AssistantSelector"
