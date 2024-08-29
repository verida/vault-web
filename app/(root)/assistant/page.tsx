"use client"

import { useCallback, useEffect, useRef } from "react"

import { AssistantChatEmptyContent } from "@/app/(root)/assistant/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(root)/assistant/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(root)/assistant/_components/assistant-chat-messages-list"
import { useAssistant } from "@/features/assistant"

export default function AssistantChatPage() {
  const { messages, sendMessage, isProcessing, error } = useAssistant()
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full flex-col gap-1">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <AssistantChatEmptyContent
            onRecommendedPromptClick={handleRecommendedPromptClick}
            className="pb-4"
          />
        ) : (
          <div className="flex min-h-full flex-col justify-end">
            <AssistantChatMessagesList
              messages={messages}
              isProcessing={isProcessing}
              className="pb-3"
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {error ? (
        // TODO: Change for an alert component
        <p className="py-2 text-destructive">{error}</p>
      ) : null}
      <AssistantChatInput
        onSendMessage={handleSendMessage}
        isProcessing={isProcessing}
      />
    </div>
  )
}
