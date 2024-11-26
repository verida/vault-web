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
import { featureFlags } from "@/config/features"
import { SUGGESTED_PROMPTS } from "@/features/assistants/constants"
import { useAiPromptDialog } from "@/features/assistants/hooks/use-ai-prompt-dialog"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { useGetAiPrompts } from "@/features/assistants/hooks/use-get-ai-prompts"
import { AiPromptInput } from "@/features/assistants/types"
import { cn } from "@/styles/utils"

export type AiPromptSelectorProps = {
  onClickSetPrompt?: (input: AiPromptInput) => void
  onItemClick?: (input: AiPromptInput) => void
} & Omit<React.ComponentProps<"div">, "children">

export function AiPromptSelector(props: AiPromptSelectorProps) {
  const { className, onClickSetPrompt, onItemClick, ...divProps } = props

  const {
    selectedAiAssistant,
    setAndProcessAiPromptInput,
    updateAiPromptInput,
    promptSearchValue,
    setPromptSearchValue,
  } = useAssistants()

  const { openEditDialog } = useAiPromptDialog()

  // TODO: Handle pagination, filter and sort. Link this to the value in the
  // CommandInput and turn the whole Command to a controlled component
  const { aiPrompts } = useGetAiPrompts({
    filter: {
      assistantId: selectedAiAssistant,
    },
  })

  const handleItemClick = useCallback(
    async (input: AiPromptInput) => {
      setAndProcessAiPromptInput(input)
      onItemClick?.(input)
    },
    [setAndProcessAiPromptInput, onItemClick]
  )

  const handleSetPromptClick = useCallback(
    async (input: AiPromptInput) => {
      updateAiPromptInput(input)
      onClickSetPrompt?.(input)
    },
    [updateAiPromptInput, onClickSetPrompt]
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
          {featureFlags.assistant.userPrompts.enabled &&
          aiPrompts &&
          aiPrompts.length > 0 ? (
            <CommandGroup heading="Saved">
              {aiPrompts.map((savedAiPrompt) => (
                <AiPromptSelectorItem
                  key={savedAiPrompt._id}
                  label={savedAiPrompt.name ?? savedAiPrompt.prompt}
                  prompt={savedAiPrompt.prompt}
                  onSelect={() => {
                    handleItemClick({
                      assistantId: selectedAiAssistant,
                      prompt: savedAiPrompt.prompt,
                    })
                  }}
                  onClickSetPrompt={() => {
                    handleSetPromptClick({
                      assistantId: selectedAiAssistant,
                      prompt: savedAiPrompt.prompt,
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
                              openEditDialog(savedAiPrompt)
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
            {SUGGESTED_PROMPTS.map((suggestedInput, index) => (
              <AiPromptSelectorItem
                key={index}
                label={suggestedInput.label}
                prompt={suggestedInput.prompt}
                onSelect={() => {
                  handleItemClick({
                    assistantId: selectedAiAssistant,
                    prompt: suggestedInput.prompt,
                  })
                }}
                onClickSetPrompt={() => {
                  handleSetPromptClick({
                    assistantId: selectedAiAssistant,
                    prompt: suggestedInput.prompt,
                  })
                }}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
AiPromptSelector.displayName = "AiPromptSelector"

type AiPromptSelectorItemProps = {
  label: string
  prompt: string
  onSelect: () => void
  onClickSetPrompt: () => void
  additionalActions?: React.ReactNode
}

function AiPromptSelectorItem(props: AiPromptSelectorItemProps) {
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
                <ArrowUpRightIcon className="size-4 sm:size-5" />
                <span className="sr-only">Edit prompt before sending</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit before sending</TooltipContent>
          </Tooltip>
          {additionalActions}
        </div>
      </div>
    </CommandItem>
  )
}
AiPromptSelectorItem.displayName = "AiPromptSelectorItem"
