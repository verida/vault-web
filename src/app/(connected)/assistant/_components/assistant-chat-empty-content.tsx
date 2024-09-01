import React from "react"

import { VeridaNetworkColouredLogo } from "@/components/icons/verida-network-coloured-logo"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { RECOMMENDED_PROMPTS_FOR_NEW_CHAT } from "@/features/assistant"
import { cn } from "@/styles/utils"

export type AssistantChatEmptyContentProps = {
  onRecommendedPromptClick?: (prompt: string) => void
} & React.ComponentProps<"div">

export function AssistantChatEmptyContent(
  props: AssistantChatEmptyContentProps
) {
  const { onRecommendedPromptClick, className, ...divProps } = props

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      {...divProps}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="size-14 rounded-md border bg-white p-2">
          <VeridaNetworkColouredLogo className="size-10" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Typography variant="heading-4">Talk about your data</Typography>
          <Typography variant="base-regular">
            Start chatting with your assistant about your private data
          </Typography>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <Typography variant="base-regular">Ask about:</Typography>
          <div className="flex flex-col items-center gap-2">
            {RECOMMENDED_PROMPTS_FOR_NEW_CHAT.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto rounded-full px-4 py-2.5"
                onClick={() => {
                  onRecommendedPromptClick?.(prompt)
                }}
              >
                <Typography key={index} variant="base-s-regular">
                  {prompt}
                </Typography>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
