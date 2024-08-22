import React from "react"

import { AssistantChatMessage } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant/types"
import { cn } from "@/lib/utils"

export type AssistantChatMessagesListProps = {
  messages: AssistantChatMessageType[]
} & Omit<React.ComponentProps<typeof ScrollArea>, "children">

export function AssistantChatMessagesList(
  props: AssistantChatMessagesListProps
) {
  const { messages, className, ...scrollAreaProps } = props

  return (
    <ScrollArea className={cn("w-full", className)} {...scrollAreaProps}>
      <ol className="flex flex-col gap-3 sm:gap-4">
        {messages.map((message, index) => (
          <li key={index}>
            <AssistantChatMessage message={message} />
          </li>
        ))}
      </ol>
    </ScrollArea>
  )
}
