"use client"

import { ArrowUpRightIcon, MessageSquareMoreIcon } from "lucide-react"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SUGGESTED_INPUTS } from "@/features/assistants/constants"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useSavedAssistantPrompts } from "@/features/assistants/hooks/use-saved-assistant-prompts"
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

  // TODO: Handle pagination, filter and sort. Link this to the value in the
  // CommandInput and turn the whole Command to a controlled component
  const { savedPrompts, isLoading: isLoadingSavedPrompts } =
    useSavedAssistantPrompts()

  const handleItemClick = useCallback(
    async (input: AssistantUserInput) => {
      setAndProcessUserInput(input)
      setOpen(false)
    },
    [setAndProcessUserInput]
  )

  const handleSetPromptClick = useCallback(
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
            {isLoadingSavedPrompts ||
            (savedPrompts && savedPrompts.length > 0) ? (
              <CommandGroup heading="Saved">
                {isLoadingSavedPrompts ? (
                  <CommandLoading>Loading...</CommandLoading>
                ) : savedPrompts ? (
                  <>
                    {savedPrompts.map((savedPrompt) => (
                      <PromptItem
                        key={savedPrompt._id}
                        label={savedPrompt.name ?? savedPrompt.data.prompt}
                        prompt={savedPrompt.data.prompt}
                        onSelect={() => {
                          handleItemClick({
                            prompt: savedPrompt.data.prompt,
                          })
                        }}
                        onClickSetPrompt={() => {
                          handleSetPromptClick({
                            prompt: savedPrompt.data.prompt,
                          })
                        }}
                      />
                    ))}
                  </>
                ) : null}
              </CommandGroup>
            ) : null}
            <CommandGroup heading="Suggested by Verida">
              {SUGGESTED_INPUTS.map((suggestedInput, index) => (
                <PromptItem
                  key={index}
                  label={suggestedInput.label}
                  prompt={suggestedInput.input.prompt}
                  onSelect={() => {
                    handleItemClick(suggestedInput.input)
                  }}
                  onClickSetPrompt={() => {
                    handleSetPromptClick(suggestedInput.input)
                  }}
                />
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

type PromptItemProps = {
  label: string
  prompt: string
  onSelect: () => void
  onClickSetPrompt: () => void
}

function PromptItem(props: PromptItemProps) {
  const { label, prompt, onSelect, onClickSetPrompt } = props

  return (
    <CommandItem
      value={prompt}
      onSelect={onSelect}
      className="cursor-pointer py-1 pl-2 pr-1"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex-1 truncate">{label}</div>
        <div className="shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onClickSetPrompt()
            }}
          >
            <ArrowUpRightIcon className="size-5 sm:size-6" />
          </Button>
        </div>
      </div>
    </CommandItem>
  )
}
PromptItem.displayName = "PromptItem"
