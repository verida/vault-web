"use client"

import { useCallback, useMemo, useState } from "react"

import { AssistantChatEmptyContent } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-messages-list"
import { NEW_CHAT_ID } from "@/features/assistant/constants"
import { mockChat } from "@/features/assistant/mock"
import { AssistantChat } from "@/features/assistant/types"
import { processUserPrompt } from "@/features/assistant/utils"

type AssistantChatPageProps = {
  params: {
    chatId: string
  }
}

export default function AssistantChatPage(props: AssistantChatPageProps) {
  const { params } = props
  const { chatId: encodedChatId } = params
  const chatId = decodeURIComponent(encodedChatId)
  // TODO: Properly implement loading chat from API based on chat id

  const initialChat = useMemo(() => {
    return chatId === NEW_CHAT_ID ? null : mockChat
  }, [chatId])

  const [chat, setChat] = useState<AssistantChat | null>(initialChat)

  const handleSendMessage = useCallback(async (message: string) => {
    // TODO: Impleemnt properly, this is just barely OK for demo
    // TODO: When creating a new chat, handle the URL change without loosing the chat

    setChat((prevChat) => {
      if (prevChat === null) {
        return {
          id: "",
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
          id: "",
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
    <div className="flex flex-1 flex-col justify-between gap-4">
      {!chat || chat.messages.length === 0 ? (
        <AssistantChatEmptyContent
          onRecommendedPromptClick={handleRecommendedPromptClick}
          className="flex-1"
        />
      ) : (
        <AssistantChatMessagesList
          messages={chat.messages}
          className="flex-grow"
        />
      )}
      <AssistantChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
