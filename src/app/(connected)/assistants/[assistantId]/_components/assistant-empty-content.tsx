"use client"

import Link from "next/link"
import React, { useCallback } from "react"

import { VeridaNetworkColouredLogo } from "@/components/icons/verida-network-coloured-logo"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { SUGGESTED_PROMPTS } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { AiPromptInput } from "@/features/assistants/types"
import { useDataConnections } from "@/features/data-connections/hooks/use-data-connections"
import { getConnectionsPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AssistantEmptyContentProps = React.ComponentProps<"div">

export function AssistantEmptyContent(props: AssistantEmptyContentProps) {
  const { className, ...divProps } = props

  const { selectedAiAssistant, setAndProcessAiPromptInput } = useAssistants()

  const { connections, isLoading: isLoadingDataConnections } =
    useDataConnections()

  const handleSuggestedPromptClick = useCallback(
    async (input: AiPromptInput) => {
      setAndProcessAiPromptInput(input)
    },
    [setAndProcessAiPromptInput]
  )

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      {...divProps}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div className="size-14 rounded-md border bg-white p-2">
          <VeridaNetworkColouredLogo className="size-10" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Typography variant="heading-4">Talk about your data</Typography>
          <Typography variant="base-regular">
            Ask questions to your assistant about your private data
            {isLoadingDataConnections ? null : connections?.length ? (
              <Typography
                variant="base-regular"
                component="span"
              >{`, for example:`}</Typography>
            ) : null}
          </Typography>
        </div>
        {isLoadingDataConnections ? null : connections?.length ? (
          <div className="flex flex-row flex-wrap items-center justify-center gap-2">
            {SUGGESTED_PROMPTS.map((recommendations, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto rounded-full px-4 py-2.5"
                onClick={() => {
                  handleSuggestedPromptClick({
                    assistantId: selectedAiAssistant,
                    prompt: recommendations.prompt,
                  })
                }}
              >
                <Typography key={index} variant="base-s-regular">
                  {recommendations.label}
                </Typography>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <Typography variant="base-semibold">
              Your assistant works best when you connect your accounts and
              extract your data.
            </Typography>
            <Button
              variant="outline"
              className="h-auto rounded-full px-4 py-2.5"
              asChild
            >
              <Link href={getConnectionsPageRoute()}>
                Connect your accounts
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
AssistantEmptyContent.displayName = "AssistantEmptyContent"
