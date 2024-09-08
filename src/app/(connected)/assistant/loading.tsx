import React from "react"

import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function AssistantLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading assistant...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we connect to your assistant
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
AssistantLoadingPage.displayName = "AssistantLoadingPage"
