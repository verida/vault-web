"use client"

import { MessageSquareMoreIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { EditIcon } from "@/components/icons/edit-icon"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SUGGESTED_INPUTS } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
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

  const { setAndProcessUserInput, updateUserPrompt } = useAssistants()

  const handleItemClick = useCallback(
    async (input: AssistantUserInput) => {
      setAndProcessUserInput(input)
      setOpen(false)
    },
    [setAndProcessUserInput]
  )

  const handleEditItemClick = useCallback(
    async (input: AssistantUserInput) => {
      updateUserPrompt(input.prompt)
      onClickEdit?.(input)
      setOpen(false)
    },
    [updateUserPrompt, onClickEdit]
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
        <Command>
          <div className="p-1">
            <CommandInput placeholder="Search..." />
          </div>
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Suggested by Verida">
              {SUGGESTED_INPUTS.map((recommendation, index) => (
                <CommandItem
                  key={index}
                  value={recommendation.input.prompt}
                  onSelect={() => {
                    handleItemClick(recommendation.input)
                  }}
                  className="cursor-pointer py-1 pl-2 pr-1"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex-1 truncate">
                      {recommendation.label}
                    </div>
                    <div className="shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditItemClick(recommendation.input)
                        }}
                      >
                        <EditIcon className="size-5 sm:size-6" />
                      </Button>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
AssistantUserInputPromptsCombobox.displayName =
  "AssistantUserInputPromptsCombobox"
