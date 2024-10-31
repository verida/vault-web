"use client"

import { AssistantChatEmptyContent } from "@/app/(connected)/assistant/_components/assistant-chat-empty-content"
import { AssistantChatInput } from "@/app/(connected)/assistant/_components/assistant-chat-input"
import { AssistantLatestMessages } from "@/app/(connected)/assistant/_components/assistant-latest-messages"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"

export default function AssistantsPage() {
  const {
    userMessage,
    assistantMessage,
    sendPrompt,
    isProcessingPrompt,
    error,
    hotload,
  } = useAssistants()

  return (
    <div className="flex h-full flex-col gap-1">
      <div className="flex-1 overflow-y-auto">
        {!userMessage ? (
          <AssistantChatEmptyContent
            onRecommendedPromptClick={sendPrompt}
            className="pb-4 pt-6"
          />
        ) : (
          <div className="flex min-h-full flex-col justify-end">
            <AssistantLatestMessages
              userMessage={userMessage}
              assistantMessage={assistantMessage}
              isProcessingMessage={isProcessingPrompt}
              className="pb-3"
            />
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
          <AlertDescription>
            {`Securely loading your data in your assistant ... ${Math.round(
              hotload.progress * 100
            )}%`}
          </AlertDescription>
          <AlertDescription>
            Answers may not be accurate until completed
          </AlertDescription>
        </Alert>
      ) : null}
      <AssistantChatInput
        onSendMessage={sendPrompt}
        isProcessingMessage={isProcessingPrompt}
      />
    </div>
  )
}
AssistantsPage.displayName = "AssistantsPage"
