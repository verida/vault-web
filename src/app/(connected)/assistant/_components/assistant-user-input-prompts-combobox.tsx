"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { AssistantUserInputSelector } from "@/app/(connected)/assistant/_components/assistant-user-input-selector"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AssistantUserInput } from "@/features/assistants/types"
import { cn } from "@/styles/utils"

export type AssistantUserInputPromptsComboboxProps = {
  onClickEdit?: (input: AssistantUserInput) => void
} & React.ComponentProps<typeof Button>

export function AssistantUserInputPromptsCombobox(
  props: AssistantUserInputPromptsComboboxProps
) {
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
      <PopoverContent
        align="start"
        alignOffset={-20}
        collisionPadding={8}
        className="w-[calc(100vw-1rem)] max-w-sm p-1"
      >
        <AssistantUserInputSelector
          onItemClick={handleItemClick}
          onClickSetPrompt={handleSetPromptClick}
        />
      </PopoverContent>
    </Popover>
  )
}
AssistantUserInputPromptsCombobox.displayName =
  "AssistantUserInputPromptsCombobox"
