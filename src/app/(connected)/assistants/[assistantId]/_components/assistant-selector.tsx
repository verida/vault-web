"use client"

import { CheckIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import React, { useMemo } from "react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { AiAssistantRecord } from "@/features/assistants/types"
import { getAssistantPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AssistantSelectorProps = {
  assistantId: string
} & React.ComponentProps<"div">

export function AssistantSelector(props: AssistantSelectorProps) {
  const { assistantId, className, ...divProps } = props

  const { aiAssistants } = useGetAiAssistants()

  const currentAssistant = useMemo(() => {
    return (aiAssistants?.find(
      (aiAssistant) => aiAssistant._id === assistantId
    ) ?? assistantId === DEFAULT_ASSISTANT._id)
      ? DEFAULT_ASSISTANT
      : null
  }, [aiAssistants, assistantId])

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      <Typography variant="heading-3">AI Assistant</Typography>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 px-2 text-foreground">
            <Typography variant="heading-3">
              {currentAssistant?.name ?? "-"}
            </Typography>
            <ChevronDownIcon className="size-5 text-muted-foreground" />
            <span className="sr-only">Select AI Assistant</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {aiAssistants && aiAssistants.length > 0 ? (
              <>
                {aiAssistants?.map((aiAssistant) => (
                  <li key={aiAssistant._id}>
                    <AssistantSelectorItem assistant={aiAssistant} />
                  </li>
                ))}
              </>
            ) : (
              <li key={DEFAULT_ASSISTANT._id}>
                <AssistantSelectorItem assistant={DEFAULT_ASSISTANT} selected />
              </li>
            )}
          </ul>
          <Button variant="outline" className="w-full">
            Create new Assistant
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
AssistantSelector.displayName = "AssistantSelector"

type AssistantSelectorItemProps = {
  assistant: AiAssistantRecord
  selected?: boolean
} & Omit<React.ComponentProps<"div">, "children">

function AssistantSelectorItem(props: AssistantSelectorItemProps) {
  const { assistant, className, selected, ...divProps } = props

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      <Button
        asChild
        variant="ghost"
        disabled={selected}
        className={cn(
          "w-full text-foreground",
          selected ? "bg-surface-hover" : ""
        )}
      >
        <Link
          href={getAssistantPageRoute({
            assistantId: assistant._id,
          })}
        >
          <div className="flex w-full flex-row items-center gap-2">
            <CheckIcon
              className={cn(
                "size-4 shrink-0",
                selected ? "opacity-100" : "opacity-0"
              )}
            />
            <Typography variant="base-regular" className="truncate">
              {assistant.name}
            </Typography>
          </div>
        </Link>
      </Button>
    </div>
  )
}
AssistantSelectorItem.displayName = "AssistantSelectorItem"
