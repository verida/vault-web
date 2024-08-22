import React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistantChatMessage } from "@/features/assistant/types"
import { cn } from "@/lib/utils"

export type AssistantChatMessagesListProps = {
  messages: AssistantChatMessage[]
} & Omit<React.ComponentProps<typeof ScrollArea>, "children">

export function AssistantChatMessagesList(
  props: AssistantChatMessagesListProps
) {
  const { messages, className, ...scrollAreaProps } = props

  return (
    <ScrollArea className={cn("w-full", className)} {...scrollAreaProps}>
      <ol className="flex flex-col gap-3">
        {messages.map((message, index) => (
          <li key={index}>
            <div className="rounded-xl border bg-white p-4">
              <p>{message.content}</p>
            </div>
          </li>
        ))}
      </ol>
    </ScrollArea>
  )
}
