"use client"

import { AssistantEmptyContent } from "@/app/(connected)/assistant/_components/assistant-empty-content"
import { AssistantOutputRenderer } from "@/app/(connected)/assistant/_components/assistant-output-renderer"
import { AssistantUserInputField } from "@/app/(connected)/assistant/_components/assistant-user-input-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"

export default function AssistantsPage() {
  const { assistantOutput, isProcessing, error, hotload } = useAssistants()

  return (
    <div className="flex h-full flex-col">
      <AssistantUserInputField className="z-10 -mb-5" />
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
          {assistantOutput || isProcessing ? (
            <AssistantOutputRenderer />
          ) : (
            <AssistantEmptyContent />
          )}
        </div>
      </div>
    </div>
  )
}
AssistantsPage.displayName = "AssistantsPage"
