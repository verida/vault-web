"use client"

import { CheckIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"
import React, { useCallback, useMemo, useState } from "react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useAiAssistantDialog } from "@/features/assistants/hooks/use-ai-assistant-dialog"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { AiAssistantRecord } from "@/features/assistants/types"
import { getAssistantPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AssistantSelectorProps = {
  assistantId: string
} & React.ComponentProps<"div">

export function AssistantSelector(props: AssistantSelectorProps) {
  const { assistantId, className, ...divProps } = props

  const { openCreateDialog } = useAiAssistantDialog()
  const { aiAssistants } = useGetAiAssistants()
  const [isOpen, setIsOpen] = useState(false)

  const currentAssistant = useMemo(() => {
    return (aiAssistants?.find(
      (aiAssistant) => aiAssistant._id === assistantId
    ) ?? assistantId === DEFAULT_ASSISTANT._id)
      ? DEFAULT_ASSISTANT
      : null
  }, [aiAssistants, assistantId])

  const handleCreateClick = useCallback(() => {
    setIsOpen(false)
    openCreateDialog()
  }, [openCreateDialog])

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      <Typography variant="heading-3">AI Assistant</Typography>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
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
                    <AssistantSelectorItem
                      assistant={aiAssistant}
                      onClick={() => setIsOpen(false)}
                    />
                  </li>
                ))}
              </>
            ) : (
              <li key={DEFAULT_ASSISTANT._id}>
                <AssistantSelectorItem
                  assistant={DEFAULT_ASSISTANT}
                  selected
                  onClick={() => setIsOpen(false)}
                />
              </li>
            )}
          </ul>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCreateClick}
          >
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
  onClick?: () => void
} & Omit<React.ComponentProps<"div">, "children">

function AssistantSelectorItem(props: AssistantSelectorItemProps) {
  const { assistant, className, selected, onClick, ...divProps } = props

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
        onClick={onClick}
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
