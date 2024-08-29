"use client"

import { useCallback } from "react"

import { AssistantChatEmptyContent } from "@/app/(root)/assistant/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(root)/assistant/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(root)/assistant/_components/assistant-chat-messages-list"
import { useAssistant } from "@/features/assistant"

export default function AssistantChatPage() {
  const { messages, sendMessage, isProcessing, error } = useAssistant()

  const handleSendMessage = useCallback(
    async (message: string) => {
      await sendMessage(message)
    },
    [sendMessage]
  )

  const handleRecommendedPromptClick = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt)
    },
    [handleSendMessage]
  )

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <AssistantChatEmptyContent
            onRecommendedPromptClick={handleRecommendedPromptClick}
            className="pb-4"
          />
        ) : (
          <AssistantChatMessagesList messages={messages} className="pb-4" />
        )}
      </div>
      {error && <p className="py-2 text-destructive-foreground">{error}</p>}
      <AssistantChatInput
        onSendMessage={handleSendMessage}
        isProcessing={isProcessing}
      />
    </div>
  )
}
