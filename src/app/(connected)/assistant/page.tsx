"use client"

import { AssistantChatEmptyContent } from "@/app/(connected)/assistant/_components/assistant-chat-empty-content"
import { AssistantLatestMessages } from "@/app/(connected)/assistant/_components/assistant-latest-messages"
import { AssistantPromptInput } from "@/app/(connected)/assistant/_components/assistant-prompt-input"
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
    <div className="flex h-full flex-col">
      <AssistantPromptInput
        onSend={sendPrompt}
        isProcessing={isProcessingPrompt}
        className="z-10 -mb-5"
      />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-1 flex-col gap-10 pb-4 pt-9 md:pb-6 xl:pb-8">
          {error || hotload.status === "error" ? (
            <Alert variant="error">
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
            <Alert variant="info">
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
          {!userMessage ? (
            <AssistantChatEmptyContent onRecommendedPromptClick={sendPrompt} />
          ) : (
            <div className="flex min-h-full flex-col justify-start">
              <AssistantLatestMessages
                userMessage={userMessage}
                assistantMessage={assistantMessage}
                isProcessingMessage={isProcessingPrompt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
AssistantsPage.displayName = "AssistantsPage"
