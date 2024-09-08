import React from "react"

import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"

export default function AssistantLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <Loading>
        <LoadingSpinner />
        <LoadingTitle>Loading assistant...</LoadingTitle>
        <LoadingDescription>
          Please wait while we connect to your assistant
        </LoadingDescription>
      </Loading>
    </div>
  )
}
AssistantLoadingPage.displayName = "AssistantLoadingPage"
