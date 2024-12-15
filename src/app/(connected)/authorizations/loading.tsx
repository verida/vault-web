import React from "react"

import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function AuthorizationsLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading authorized apps...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your authorized apps
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
AuthorizationsLoadingPage.displayName = "AuthorizationsLoadingPage"
