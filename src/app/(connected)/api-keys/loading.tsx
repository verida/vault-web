import React from "react"

import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function ApiKeysLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading API keys...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your API keys
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
ApiKeysLoadingPage.displayName = "ApiKeysLoadingPage"
