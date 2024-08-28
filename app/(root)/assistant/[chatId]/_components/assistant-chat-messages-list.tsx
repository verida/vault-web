import React from "react"

import { AssistantChatMessage } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-message"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant/types"
import { cn } from "@/lib/utils"

export type AssistantChatMessagesListProps = {
  messages: AssistantChatMessageType[]
} & Omit<React.ComponentProps<"ul">, "children">

export function AssistantChatMessagesList(
  props: AssistantChatMessagesListProps
) {
  const { messages, className, ...ulProps } = props

  return (
    <ul
      className={cn("flex flex-col justify-end gap-3 sm:gap-4", className)}
      {...ulProps}
    >
      {messages.map((message, index) => (
        <li key={index}>
          <AssistantChatMessage message={message} />
        </li>
      ))}
    </ul>
  )
}
