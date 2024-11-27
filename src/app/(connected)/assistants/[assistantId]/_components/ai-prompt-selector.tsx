"use client"

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ArrowUpRightIcon, GripVerticalIcon } from "lucide-react"
import { useCallback, useMemo } from "react"

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
import { useUpdateAiPrompt } from "@/features/assistants/hooks/use-update-ai-prompt"
import { AiPromptInput, AiPromptRecord } from "@/features/assistants/types"
import { Logger } from "@/features/telemetry/logger"
import { cn } from "@/styles/utils"
import { moveItemInArray } from "@/utils/misc"

const logger = Logger.create("assistants")

export type AiPromptSelectorProps = {
  onClickSetPrompt?: (input: AiPromptInput) => void
  onItemClick?: (input: AiPromptInput) => void
} & Omit<React.ComponentProps<"div">, "children">

export function AiPromptSelector(props: AiPromptSelectorProps) {
  const { className, onClickSetPrompt, onItemClick, ...divProps } = props

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
  const { updateAiPromptAsync } = useUpdateAiPrompt()

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

  const sortedAiPromptIds = useMemo(() => {
    return aiPrompts
      ? aiPrompts.map((aiPrompt) => ({
          id: aiPrompt._id,
        }))
      : []
  }, [aiPrompts])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      if (!aiPrompts) {
        return
      }

      const { active, over } = event

      if (active.id === over?.id) {
        return
      }

      const oldIndex = aiPrompts.findIndex(
        (aiPrompt) => aiPrompt._id === active.id
      )
      const newIndex = aiPrompts.findIndex(
        (aiPrompt) => aiPrompt._id === over?.id
      )

      const movedAiPrompt = aiPrompts[oldIndex]
      const newAiPrompts = moveItemInArray(aiPrompts, oldIndex, newIndex)

      // Get previous and next prompts for order calculation
      const prevPrompt = newIndex > 0 ? newAiPrompts[newIndex - 1] : null
      const nextPrompt =
        newIndex < newAiPrompts.length - 1 ? newAiPrompts[newIndex + 1] : null

      let newOrder: number

      if (prevPrompt?.order !== undefined && nextPrompt?.order !== undefined) {
        // Both neighbors have order - set as average
        newOrder = (prevPrompt.order + nextPrompt.order) / 2
      } else if (prevPrompt?.order !== undefined) {
        // Only previous has order - add 100
        newOrder = prevPrompt.order + 100
      } else if (nextPrompt?.order !== undefined) {
        // Only next has order - subtract 100
        newOrder = nextPrompt.order - 100
      } else {
        // Neither has order - start at 100 * position
        newOrder = (newIndex + 1) * 100
      }

      try {
        // Update the moved assistant with new order
        await updateAiPromptAsync({
          ...movedAiPrompt,
          order: newOrder,
        })
      } catch (error) {
        logger.error(
          new Error("Failed to update assistant order", { cause: error })
        )
      }
    },
    [aiPrompts, updateAiPromptAsync]
  )

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortedAiPromptIds}
                  strategy={verticalListSortingStrategy}
                >
                  {aiPrompts.map((savedAiPrompt) => (
                    <AiPromptSelectorItem
                      key={savedAiPrompt._id}
                      aiPrompt={savedAiPrompt}
                      sortable={aiPrompts.length > 1}
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
                </SortableContext>
              </DndContext>
            </CommandGroup>
          ) : null}
          <CommandGroup heading="Suggested by Verida">
            {SUGGESTED_PROMPTS.map((suggestedPrompt, index) => (
              <AiPromptSelectorItem
                key={index}
                aiPrompt={suggestedPrompt}
                onSelect={() => {
                  handleItemClick({
                    assistantId: selectedAiAssistant,
                    prompt: suggestedPrompt.prompt,
                  })
                }}
                onClickSetPrompt={() => {
                  handleSetPromptClick({
                    assistantId: selectedAiAssistant,
                    prompt: suggestedPrompt.prompt,
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
  aiPrompt: AiPromptRecord
  onSelect: () => void
  onClickSetPrompt: () => void
  sortable?: boolean
  additionalActions?: React.ReactNode
}

function AiPromptSelectorItem(props: AiPromptSelectorItemProps) {
  const { aiPrompt, onSelect, onClickSetPrompt, sortable, additionalActions } =
    props

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: aiPrompt._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <CommandItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      value={aiPrompt.prompt}
      onSelect={onSelect}
      className="cursor-pointer py-1 pl-2 pr-1"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-2">
          {sortable ? (
            <div {...listeners} className="shrink-0 cursor-grab">
              <GripVerticalIcon className="size-4 text-muted-foreground" />
            </div>
          ) : null}
          <Typography variant="base-regular" className="truncate">
            {aiPrompt.name}
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
