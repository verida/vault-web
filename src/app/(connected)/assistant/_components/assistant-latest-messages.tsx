import { AssistantChatMessage } from "@/app/(connected)/assistant/_components/assistant-chat-message"
import { AssistantChatMessage as AssistantChatMessageType } from "@/features/assistants/types"
import { cn } from "@/styles/utils"

type AssistantLatestMessagesProps = {
  userMessage: AssistantChatMessageType
  assistantMessage: AssistantChatMessageType | null
  isProcessingMessage: boolean
  className?: string
}

export function AssistantLatestMessages({
  userMessage,
  assistantMessage,
  isProcessingMessage,
  className,
}: AssistantLatestMessagesProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <AssistantChatMessage message={userMessage} />
      {(assistantMessage || isProcessingMessage) && (
        <AssistantChatMessage
          message={
            assistantMessage || {
              sender: "assistant",
              content: "Thinking...",
            }
          }
          isProcessing={isProcessingMessage}
        />
      )}
    </div>
  )
}

AssistantLatestMessages.displayName = "AssistantLatestMessages"
