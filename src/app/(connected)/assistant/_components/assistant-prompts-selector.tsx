"use client"

import { ArrowUpRightIcon } from "lucide-react"
import { useCallback } from "react"

import { EditIcon } from "@/components/icons/edit-icon"
import { Typography } from "@/components/typography"
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SUGGESTED_INPUTS } from "@/features/assistants/constants"
import { useAssistantPromptDialog } from "@/features/assistants/hooks/use-assistant-prompt-dialog"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useSavedAssistantPrompts } from "@/features/assistants/hooks/use-saved-assistant-prompts"
import { AssistantUserInput } from "@/features/assistants/types"
import { cn } from "@/styles/utils"

export type AssistantPromptsSelectorProps = {
  onClickSetPrompt?: (input: AssistantUserInput) => void
  onItemClick?: (input: AssistantUserInput) => void
} & Omit<React.ComponentProps<"div">, "children">

export function AssistantPromptsSelector(props: AssistantPromptsSelectorProps) {
  const { className, onClickSetPrompt, onItemClick, ...divProps } = props

  const {
    setAndProcessUserInput,
    updateUserPrompt,
    promptSearchValue,
    setPromptSearchValue,
  } = useAssistants()

  const { openEditDialog } = useAssistantPromptDialog()

  // TODO: Handle pagination, filter and sort. Link this to the value in the
  // CommandInput and turn the whole Command to a controlled component
  const { savedPrompts } = useSavedAssistantPrompts()

  const handleItemClick = useCallback(
    async (input: AssistantUserInput) => {
      setAndProcessUserInput(input)
      onItemClick?.(input)
    },
    [setAndProcessUserInput, onItemClick]
  )

  const handleSetPromptClick = useCallback(
    async (input: AssistantUserInput) => {
      updateUserPrompt(input.prompt)
      onClickSetPrompt?.(input)
    },
    [updateUserPrompt, onClickSetPrompt]
  )

  const handleClearSearch = useCallback(() => {
    setPromptSearchValue("")
  }, [setPromptSearchValue])

  return (
    <div {...divProps} className={cn(className)}>
      <Command loop>
        <div className="p-1">
          <CommandInput
            placeholder="Search..."
            value={promptSearchValue}
            onValueChange={setPromptSearchValue}
            displayClearButton={promptSearchValue.length > 0}
            onClear={handleClearSearch}
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {savedPrompts && savedPrompts.length > 0 ? (
            <CommandGroup heading="Saved">
              {savedPrompts.map((savedPrompt) => (
                <PromptItem
                  key={savedPrompt._id}
                  label={savedPrompt.name ?? savedPrompt.prompt}
                  prompt={savedPrompt.prompt}
                  onSelect={() => {
                    handleItemClick({
                      prompt: savedPrompt.prompt,
                    })
                  }}
                  onClickSetPrompt={() => {
                    handleSetPromptClick({
                      prompt: savedPrompt.prompt,
                    })
                  }}
                  additionalActions={
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditDialog(savedPrompt)
                            }}
                          >
                            <EditIcon className="size-5 sm:size-6" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </>
                  }
                />
              ))}
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
    </div>
  )
}
AssistantPromptsSelector.displayName = "AssistantPromptsSelector"

type PromptItemProps = {
  label: string
  prompt: string
  onSelect: () => void
  onClickSetPrompt: () => void
  additionalActions?: React.ReactNode
}

function PromptItem(props: PromptItemProps) {
  const { label, prompt, onSelect, onClickSetPrompt, additionalActions } = props

  return (
    <CommandItem
      value={prompt}
      onSelect={onSelect}
      className="cursor-pointer py-1 pl-2 pr-1"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="min-w-0 flex-1">
          <Typography variant="base-regular" className="truncate">
            {label}
          </Typography>
        </div>
        <div className="flex shrink-0 flex-row items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onClickSetPrompt()
                }}
              >
                <ArrowUpRightIcon className="size-5 sm:size-6" />
                <span className="sr-only">Change prompt before sending</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Change prompt before sending</TooltipContent>
          </Tooltip>
          {additionalActions}
        </div>
      </div>
    </CommandItem>
  )
}
PromptItem.displayName = "PromptItem"
