"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { ComponentProps, useCallback, useState } from "react"
import React from "react"

import { AiPromptSelector } from "@/app/(connected)/assistants/[assistantId]/_components/ai-prompt-selector"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/styles/utils"

export interface AiPromptsComboboxProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  onSetPrompt?: () => void
}

export function AiPromptsCombobox(props: AiPromptsComboboxProps) {
  const { className, onSetPrompt, ...buttonProps } = props

  const [open, setOpen] = useState(false)

  const handleSelect = useCallback(async () => {
    setOpen(false)
  }, [])

  const handleSetPrompt = useCallback(() => {
    onSetPrompt?.()
    setOpen(false)
  }, [onSetPrompt])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              {...buttonProps}
              aria-expanded={open}
              className={cn(className)}
            >
              <MessageSquareMoreIcon className="size-5 sm:size-6" />
              <span className="sr-only">Open prompts menu</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Your prompts</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="start"
        alignOffset={-20}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm rounded-[0.875rem] p-1"
      >
        <AiPromptSelector
          onSelect={handleSelect}
          onSetPrompt={handleSetPrompt}
        />
      </PopoverContent>
    </Popover>
  )
}
AiPromptsCombobox.displayName = "AiPromptsCombobox"
