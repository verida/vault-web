"use client"

import { ChevronDownIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo, useState } from "react"

import { EditIcon } from "@/components/icons/edit-icon"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DEFAULT_ASSISTANT } from "@/features/assistants/constants"
import { useAiAssistantDialog } from "@/features/assistants/hooks/use-ai-assistant-dialog"
import { useGetAiAssistants } from "@/features/assistants/hooks/use-get-ai-assistants"
import { AiAssistantRecord } from "@/features/assistants/types"
import { getAssistantPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AssistantSelectorProps = {
  assistantId: string
} & React.ComponentProps<"div">

export function AssistantSelector(props: AssistantSelectorProps) {
  const { assistantId, className, ...divProps } = props

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { openCreateDialog, openEditDialog } = useAiAssistantDialog()
  const { aiAssistants } = useGetAiAssistants()

  const currentAssistant = useMemo(() => {
    return (aiAssistants?.find(
      (aiAssistant) => aiAssistant._id === assistantId
    ) ?? assistantId === DEFAULT_ASSISTANT._id)
      ? DEFAULT_ASSISTANT
      : null
  }, [aiAssistants, assistantId])

  const handleCreateClick = useCallback(() => {
    openCreateDialog()
    setOpen(false)
  }, [openCreateDialog])

  const handleItemSelect = useCallback(
    (assistant: AiAssistantRecord) => {
      setOpen(false)
      router.push(getAssistantPageRoute({ assistantId: assistant._id }))
    },
    [router]
  )

  const handleEditClick = useCallback(
    (assistant: AiAssistantRecord) => {
      openEditDialog(assistant)
      setOpen(false)
    },
    [openEditDialog]
  )

  return (
    <div
      className={cn("flex flex-row items-center gap-2", className)}
      {...divProps}
    >
      <Typography variant="heading-3">AI Assistant</Typography>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 px-2 text-foreground"
            aria-expanded={open}
          >
            <Typography variant="heading-3">
              {currentAssistant?.name ?? "-"}
            </Typography>
            <ChevronDownIcon className="size-5 text-muted-foreground" />
            <span className="sr-only">Select AI Assistant</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={-20}
          collisionPadding={8}
          className="w-[calc(100vw-1rem)] max-w-sm rounded-[0.875rem] p-0"
        >
          <Command loop className="rounded-[0.875rem]">
            <CommandList>
              <CommandGroup className="p-2">
                {aiAssistants && aiAssistants.length > 0 ? (
                  <>
                    {aiAssistants?.map((aiAssistant) => (
                      <AssistantSelectorItem
                        key={aiAssistant._id}
                        assistant={aiAssistant}
                        onSelect={() => {
                          handleItemSelect(aiAssistant)
                        }}
                        onEditClick={() => {
                          handleEditClick(aiAssistant)
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <AssistantSelectorItem
                    assistant={DEFAULT_ASSISTANT}
                    selected
                    onSelect={() => {
                      handleItemSelect(DEFAULT_ASSISTANT)
                    }}
                    onEditClick={() => {
                      handleEditClick(DEFAULT_ASSISTANT)
                    }}
                  />
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup className="p-2">
                <CommandItem
                  onSelect={handleCreateClick}
                  className="flex h-12 cursor-pointer flex-row items-center py-1 pl-2 pr-1"
                >
                  <Typography
                    variant="base-regular"
                    className="truncate italic"
                  >
                    Create new Assistant...
                  </Typography>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
AssistantSelector.displayName = "AssistantSelector"

type AssistantSelectorItemProps = {
  assistant: AiAssistantRecord
  selected?: boolean
  onSelect?: () => void
  onEditClick?: () => void
}

function AssistantSelectorItem(props: AssistantSelectorItemProps) {
  const { assistant, onSelect, onEditClick } = props

  return (
    <CommandItem
      value={assistant.name}
      onSelect={onSelect}
      className="cursor-pointer py-1 pl-2 pr-1"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="min-w-0 flex-1">
          <Typography variant="base-regular" className="truncate">
            {assistant.name}
          </Typography>
        </div>
        {onEditClick ? (
          <div className="flex shrink-0 flex-row items-center gap-1">
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
          </div>
        ) : null}
      </div>
    </CommandItem>
  )
}
AssistantSelectorItem.displayName = "AssistantSelectorItem"
