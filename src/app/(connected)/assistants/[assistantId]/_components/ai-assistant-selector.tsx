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
import { CheckIcon, GripVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo, useState } from "react"

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
  CommandSeparator,
} from "@/components/ui/command"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DEFAULT_ASSISTANT,
  MAX_NB_ASSISTANTS,
} from "@/features/assistants/constants"
import { useAiAssistantDialog } from "@/features/assistants/hooks/use-ai-assistant-dialog"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { useUpdateAiAssistant } from "@/features/assistants/hooks/use-update-ai-assistant"
import {
  AiAssistantFormData,
  AiAssistantRecord,
} from "@/features/assistants/types"
import { getAssistantPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry/logger"
import { cn } from "@/styles/utils"
import { moveItemInArray } from "@/utils/misc"

const logger = Logger.create("assistants")

export type AiAssistantSelectorProps = {
  currentAssistantId?: string
  onCreateClick?: () => void
  onItemSelect?: (assistant: AiAssistantRecord) => void
  onEditClick?: (assistant: AiAssistantRecord) => void
  hideSearch?: boolean
} & Omit<React.ComponentProps<"div">, "children">

export function AiAssistantSelector(props: AiAssistantSelectorProps) {
  const {
    currentAssistantId,
    onCreateClick,
    onItemSelect,
    onEditClick,
    className,
    hideSearch = false,
    ...divProps
  } = props

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const router = useRouter()

  const [searchValue, setSearchValue] = useState("")

  const { openCreateDialog, openEditDialog } = useAiAssistantDialog()
  const { aiAssistants } = useGetAiAssistants()
  const { updateAiAssistantAsync } = useUpdateAiAssistant()

  const handleCreateClick = useCallback(
    (data?: Partial<AiAssistantFormData>) => {
      openCreateDialog(data)
      onCreateClick?.()
    },
    [openCreateDialog, onCreateClick]
  )

  const handleItemSelect = useCallback(
    (assistant: AiAssistantRecord) => {
      onItemSelect?.(assistant)
      router.push(getAssistantPageRoute({ assistantId: assistant._id }))
    },
    [onItemSelect, router]
  )

  const handleEditClick = useCallback(
    (assistant: AiAssistantRecord) => {
      openEditDialog(assistant)
      onEditClick?.(assistant)
    },
    [openEditDialog, onEditClick]
  )

  const handleClearSearch = useCallback(() => {
    setSearchValue("")
  }, [setSearchValue])

  const sortedAiAssistantIds = useMemo(() => {
    return aiAssistants
      ? aiAssistants.map((aiAssistant) => ({
          id: aiAssistant._id,
        }))
      : []
  }, [aiAssistants])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      if (!aiAssistants) {
        return
      }

      const { active, over } = event

      if (active.id === over?.id) {
        return
      }

      const oldIndex = aiAssistants.findIndex(
        (aiAssistant) => aiAssistant._id === active.id
      )
      const newIndex = aiAssistants.findIndex(
        (aiAssistant) => aiAssistant._id === over?.id
      )

      const movedAssistant = aiAssistants[oldIndex]
      const newAiAssistants = moveItemInArray(aiAssistants, oldIndex, newIndex)

      // Get previous and next assistants for order calculation
      const prevAssistant = newIndex > 0 ? newAiAssistants[newIndex - 1] : null
      const nextAssistant =
        newIndex < newAiAssistants.length - 1
          ? newAiAssistants[newIndex + 1]
          : null

      let newOrder: number

      if (
        prevAssistant?.order !== undefined &&
        nextAssistant?.order !== undefined
      ) {
        // Both neighbors have order - set as average
        newOrder = (prevAssistant.order + nextAssistant.order) / 2
      } else if (prevAssistant?.order !== undefined) {
        // Only previous has order - add 100
        newOrder = prevAssistant.order + 100
      } else if (nextAssistant?.order !== undefined) {
        // Only next has order - subtract 100
        newOrder = nextAssistant.order - 100
      } else {
        // Neither has order - start at 100 * position
        newOrder = (newIndex + 1) * 100
      }

      try {
        // Update the moved assistant with new order
        await updateAiAssistantAsync({
          ...movedAssistant,
          order: newOrder,
        })
      } catch (error) {
        logger.error(
          new Error("Failed to update assistant order", { cause: error })
        )
      }
    },
    [aiAssistants, updateAiAssistantAsync]
  )

  const isMaxNbAssistantsReached = useMemo(() => {
    return aiAssistants ? aiAssistants?.length >= MAX_NB_ASSISTANTS : false
  }, [aiAssistants])

  return (
    <div {...divProps} className={cn("rounded-[0.875rem]", className)}>
      <Command loop className="rounded-[0.875rem]">
        {!hideSearch ? (
          <div className="p-2">
            <CommandInput
              placeholder="Search..."
              value={searchValue}
              onValueChange={setSearchValue}
              displayClearButton={searchValue.length > 0}
              onClear={handleClearSearch}
            />
          </div>
        ) : null}
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {aiAssistants && aiAssistants.length > 0 ? (
            <CommandGroup heading="Your assistants" className="p-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortedAiAssistantIds}
                  strategy={verticalListSortingStrategy}
                >
                  {aiAssistants?.map((aiAssistant) => (
                    <AiAssistantSelectorItem
                      key={aiAssistant._id}
                      assistant={aiAssistant}
                      isCurrentAssistant={
                        currentAssistantId === aiAssistant._id
                      }
                      onSelect={() => {
                        handleItemSelect(aiAssistant)
                      }}
                      onEditClick={() => {
                        handleEditClick(aiAssistant)
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </CommandGroup>
          ) : (
            <CommandGroup heading="Suggested by Verida" className="p-2">
              <AiAssistantSelectorItem
                assistant={DEFAULT_ASSISTANT}
                isCurrentAssistant={
                  currentAssistantId === DEFAULT_ASSISTANT._id
                }
                onSelect={() => {
                  handleItemSelect(DEFAULT_ASSISTANT)
                }}
                onEditClick={() => {
                  handleCreateClick(DEFAULT_ASSISTANT)
                }}
              />
            </CommandGroup>
          )}
          <CommandSeparator />
          <CommandGroup className="p-2">
            <CommandItem
              onSelect={() => handleCreateClick()}
              disabled={isMaxNbAssistantsReached}
              className="flex h-12 cursor-pointer flex-row items-center py-1 pl-2 pr-1 text-muted-foreground"
            >
              <Typography variant="base-semibold" className="truncate">
                {isMaxNbAssistantsReached
                  ? "Can't create more assistants"
                  : "Create a new assistant..."}
              </Typography>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
AiAssistantSelector.displayName = "AiAssistantSelector"

type AiAssistantSelectorItemProps = {
  assistant: AiAssistantRecord
  isCurrentAssistant?: boolean
  onSelect?: () => void
  onEditClick?: () => void
}

function AiAssistantSelectorItem(props: AiAssistantSelectorItemProps) {
  const { assistant, isCurrentAssistant, onSelect, onEditClick } = props

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: assistant._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <CommandItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      value={assistant.name}
      onSelect={onSelect}
      className="cursor-pointer py-1 pl-2 pr-1"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-1">
          <div {...listeners} className="cursor-grab">
            <GripVertical className="mr-2 size-4" />
          </div>
          {/* <CheckIcon
            className={cn(
              "size-4 shrink-0",
              isCurrentAssistant ? "opacity-100" : "opacity-0"
            )}
          /> */}
          <Typography variant="base-regular" className="truncate">
            {assistant.name}
          </Typography>
        </div>
        {onEditClick ? (
          <div className="flex shrink-0 flex-row items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditClick?.()
                  }}
                >
                  <EditIcon className="size-5 sm:size-6" />
                  <span className="sr-only">Edit assistant</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit assistant</TooltipContent>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </CommandItem>
  )
}
AiAssistantSelectorItem.displayName = "AiAssistantSelectorItem"
