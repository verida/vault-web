import React from "react"

import { AssistantChatMessage } from "@/features/assistant/types"
import { cn } from "@/lib/utils"

export type AssistantChatMessagesListProps = {
  messages: AssistantChatMessage[]
} & Omit<React.ComponentProps<"div">, "children">

export function AssistantChatMessagesList(
  props: AssistantChatMessagesListProps
) {
  const { messages, className, ...divProps } = props

  return (
    <div
      {...divProps}
      className={cn("flex flex-col justify-end overflow-y-scroll", className)}
    >
      <ol className="flex flex-col gap-3">
        {messages.map((message, index) => (
          <li key={index}>
            <div className="rounded-xl border bg-white p-4">
              <p>{message.content}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
