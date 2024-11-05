"use client"

import { AssistantDataStatus } from "@/app/(connected)/assistant/_components/assistant-data-status"
import { AssistantEmptyContent } from "@/app/(connected)/assistant/_components/assistant-empty-content"
import { AssistantOutputRenderer } from "@/app/(connected)/assistant/_components/assistant-output-renderer"
import { AssistantUserInputField } from "@/app/(connected)/assistant/_components/assistant-user-input-field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAssistants } from "@/features/assistants/hooks/use-assistants"

export default function AssistantsPage() {
  const { assistantOutput, isProcessing, error } = useAssistants()

  return (
    <div className="flex h-full flex-col">
      <AssistantUserInputField className="z-10 -mb-5" />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-1 flex-col gap-4 pb-4 pt-9 md:pb-6 xl:pb-8">
          <AssistantDataStatus />
          {error ? (
            <Alert variant="error">
              <AlertTitle>Assistant error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
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
