"use client"

import { useCallback, useState } from "react"

import { AssistantChatEmptyContent } from "@/app/(root)/assistant/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(root)/assistant/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(root)/assistant/_components/assistant-chat-messages-list"
import { AssistantChat } from "@/features/assistant/types"
import { processUserPrompt } from "@/features/assistant/utils"

export default function AssistantChatPage() {
  const [chat, setChat] = useState<AssistantChat | null>(null)

  const handleSendMessage = useCallback(async (message: string) => {
    // TODO: Implement properly, this is just barely OK for demo

    setChat((prevChat) => {
      if (prevChat === null) {
        return {
          messages: [
            {
              sender: "user",
              content: message,
            },
          ],
        }
      }
      return {
        ...prevChat,
        messages: [
          ...prevChat.messages,
          {
            sender: "user",
            content: message,
          },
        ],
      }
    })

    const response = await processUserPrompt(message)

    setChat((prevChat) => {
      if (prevChat === null) {
        return {
          messages: [
            {
              sender: "user",
              content: message,
            },
            {
              sender: "assistant",
              content: response,
            },
          ],
        }
      }
      return {
        ...prevChat,
        messages: [
          ...prevChat.messages,
          {
            sender: "assistant",
            content: response,
          },
        ],
      }
    })
  }, [])

  const handleRecommendedPromptClick = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt)
    },
    [handleSendMessage]
  )

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1 overflow-y-auto">
        {!chat || chat.messages.length === 0 ? (
          <AssistantChatEmptyContent
            onRecommendedPromptClick={handleRecommendedPromptClick}
            className="pb-4"
          />
        ) : (
          <AssistantChatMessagesList
            messages={chat.messages}
            className="pb-4"
          />
        )}
      </div>
      <AssistantChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
