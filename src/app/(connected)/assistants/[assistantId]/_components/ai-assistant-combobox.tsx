"use client"

import { ChevronDownIcon } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { AiAssistantSelector } from "@/app/(connected)/assistants/[assistantId]/_components/ai-assistant-selector"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { cn } from "@/styles/utils"

type AiAssistantComboboxProps = {
  assistantId: string
} & Omit<React.ComponentProps<typeof Button>, "children">

export function AiAssistantCombobox(props: AiAssistantComboboxProps) {
  const { assistantId, className, ...buttonProps } = props

  const [open, setOpen] = useState(false)

  const { setSelectedAiAssistant } = useAssistants()
  const { aiAssistants } = useGetAiAssistants()

  useEffect(() => {
    setSelectedAiAssistant(assistantId)
  }, [assistantId, setSelectedAiAssistant])

  const currentAssistant = useMemo(() => {
    return (
      aiAssistants?.find((aiAssistant) => aiAssistant._id === assistantId) ??
      (assistantId === DEFAULT_ASSISTANT._id ? DEFAULT_ASSISTANT : null)
    )
  }, [aiAssistants, assistantId])

  const handleAction = useCallback(async () => {
    setOpen(false)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...buttonProps}
          className={cn(
            "min-w-0 gap-2 bg-transparent px-2",
            currentAssistant ? "text-foreground" : "text-muted-foreground",
            className
          )}
          aria-expanded={open}
        >
          {currentAssistant ? (
            <Typography variant="heading-3" className="truncate">
              {currentAssistant.name}
            </Typography>
          ) : (
            <Typography variant="heading-5" className="truncate italic">
              Choose Assistant
            </Typography>
          )}
          <ChevronDownIcon className="size-5 shrink-0 text-muted-foreground" />
          <span className="sr-only">Select AI Assistant</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-20}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm rounded-[0.875rem] p-0"
      >
        <AiAssistantSelector
          currentAssistantId={assistantId}
          onCreateClick={handleAction}
          onItemSelect={handleAction}
          onEditClick={handleAction}
        />
      </PopoverContent>
    </Popover>
  )
}
AiAssistantCombobox.displayName = "AiAssistantCombobox"
