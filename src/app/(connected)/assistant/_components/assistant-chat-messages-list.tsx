import React from "react"

import { AssistantChatMessage } from "@/app/(connected)/assistant/_components/assistant-chat-message"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistant/types"
import { cn } from "@/styles/utils"

export type AssistantChatMessagesListProps = {
  messages: AssistantChatMessageType[]
  isProcessingMessage?: boolean
} & Omit<React.ComponentProps<"ul">, "children">

export function AssistantChatMessagesList(
  props: AssistantChatMessagesListProps
) {
  const { messages, isProcessingMessage, className, ...ulProps } = props

  return (
    <ul className={cn("flex flex-col gap-3 sm:gap-4", className)} {...ulProps}>
      {messages.map((message, index) => (
        <li key={index}>
          <AssistantChatMessage message={message} />
        </li>
      ))}
      {isProcessingMessage ? (
        <li>
          <AssistantChatMessage
            message={{
              sender: "assistant",
              content: "",
            }}
            isProcessing={true}
          />
        </li>
      ) : null}
    </ul>
  )
}
