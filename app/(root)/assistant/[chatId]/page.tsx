"use client"

import { useCallback, useState } from "react"

import { AssistantChatInput } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-messages-list"
import { mockChat } from "@/features/assistant/mock"
import { AssistantChat } from "@/features/assistant/types"
import { processUserPrompt } from "@/features/assistant/utils"

export default function AssistantChatPage() {
  // TODO: Get the chat ID from the URL
  // TODO: If "new", display and empty chat
  // TODO: If an ID, fetch the chat and load it
  // TODO: Process new message
  const [chat, setChat] = useState<AssistantChat>(mockChat)

  const handleSendMessage = useCallback(async (message: string) => {
    setChat((prevChat) => ({
      ...prevChat,
      messages: [
        ...prevChat.messages,
        {
          sender: "user",
          content: message,
        },
      ],
    }))

    const response = await processUserPrompt(message)

    setChat((prevChat) => ({
      ...prevChat,
      messages: [
        ...prevChat.messages,
        {
          sender: "assistant",
          content: response,
        },
      ],
    }))
  }, [])

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <AssistantChatMessagesList messages={chat.messages} className="flex-1" />
      <AssistantChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
