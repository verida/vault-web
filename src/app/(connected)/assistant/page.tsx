"use client"

import { useCallback, useEffect, useRef } from "react"

import { AssistantChatEmptyContent } from "@/app/(connected)/assistant/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(connected)/assistant/_components/assistant-chat-input"
import { AssistantChatMessagesList } from "@/app/(connected)/assistant/_components/assistant-chat-messages-list"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAssistant } from "@/features/assistant/use-assistant"

export default function AssistantChatPage() {
  const { messages, sendMessage, isProcessingMessage, error, hotload } =
    useAssistant()
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

  useEffect(() => {
    if ("virtualKeyboard" in navigator) {
      ;(navigator as any).virtualKeyboard.overlaysContent = true
    }
  }, [])

  return (
    <div
      className="flex h-full flex-col gap-1"
      style={{
        marginBottom: "env(keyboard-inset-height, 0px)",
      }}
    >
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
              isProcessingMessage={isProcessingMessage}
              className="pb-3"
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {error || hotload.status === "error" ? (
        <Alert variant="error" className="mb-2">
          <AlertTitle>Assistant error</AlertTitle>
          <AlertDescription>
            {error
              ? error
              : hotload.status === "error"
                ? "There was an error loading your assistant"
                : "Something went wrong while loading your assistant"}
          </AlertDescription>
        </Alert>
      ) : null}
      {hotload.status === "loading" ? (
        <Alert variant="info" className="mb-2">
          <AlertDescription>{`Securely loading your data in your assistant ... ${Math.round(hotload.progress * 100)}%`}</AlertDescription>
          <AlertDescription>
            Answers may not be accurate until completed
          </AlertDescription>
        </Alert>
      ) : null}
      <AssistantChatInput
        onSendMessage={handleSendMessage}
        isProcessingMessage={isProcessingMessage}
      />
    </div>
  )
}
AssistantChatPage.displayName = "AssistantChatPage"
