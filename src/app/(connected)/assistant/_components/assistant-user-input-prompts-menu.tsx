"use client"

import { useCallback } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SUGGESTED_INPUTS } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { AssistantUserInput } from "@/features/assistants/types"

export type AssistantUserInputPromptsMenuProps = {
  children: React.ReactNode
}

export function AssistantUserInputPromptsMenu(
  props: AssistantUserInputPromptsMenuProps
) {
  const { children } = props

  const { setAndProcessUserInput } = useAssistants()

  const handleRecommendedPromptClick = useCallback(
    async (input: AssistantUserInput) => {
      setAndProcessUserInput(input)
    },
    [setAndProcessUserInput]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        alignOffset={0}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm"
      >
        <DropdownMenuLabel className="text-muted-foreground">
          Suggested
        </DropdownMenuLabel>
        {SUGGESTED_INPUTS.map((recommendation, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              handleRecommendedPromptClick(recommendation.input)
            }}
          >
            {recommendation.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
AssistantUserInputPromptsMenu.displayName = "AssistantUserInputPromptsMenu"
