"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { AssistantPromptsSelector } from "@/app/(connected)/assistants/_components/assistant-prompts-selector"
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
import { AssistantUserInput } from "@/features/assistants/types"
import { cn } from "@/styles/utils"

export type AssistantPromptsComboboxProps = {
  onClickEdit?: (input: AssistantUserInput) => void
} & React.ComponentProps<typeof Button>

export function AssistantPromptsCombobox(props: AssistantPromptsComboboxProps) {
  const { className, onClickEdit, ...buttonProps } = props

  const [open, setOpen] = useState(false)

  const handleItemClick = useCallback(async () => {
    setOpen(false)
  }, [])

  const handleSetPromptClick = useCallback(
    async (input: AssistantUserInput) => {
      onClickEdit?.(input)
      setOpen(false)
    },
    [onClickEdit]
  )

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
        <AssistantPromptsSelector
          onItemClick={handleItemClick}
          onClickSetPrompt={handleSetPromptClick}
        />
      </PopoverContent>
    </Popover>
  )
}
AssistantPromptsCombobox.displayName = "AssistantPromptsCombobox"
