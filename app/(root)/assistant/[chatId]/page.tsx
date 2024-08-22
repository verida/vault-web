"use client"

import { useCallback } from "react"

import { AssistantChatInput } from "@/app/(root)/assistant/[chatId]/_components/assistant-chat-input"

export default function AssistantChatPage() {
  // TODO: Get the chat ID from the URL
  // TODO: If "new", display and empty chat
  // TODO: If an ID, fetch the chat and load it
  // TODO: Process new message

  const handleSendMessage = useCallback(() => {
    // const handleSendMessage = useCallback((_message: string) => {
    // console.debug("Sending message", message)
  }, [])

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <div className="flex-1"></div>
      <AssistantChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
