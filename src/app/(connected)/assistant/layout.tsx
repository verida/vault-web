import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"

type AssistantLayoutProps = {
  children: React.ReactNode
}

export default function AssistantLayout(props: AssistantLayoutProps) {
  const { children } = props

  if (!featureFlags.assistant.enabled) {
    notFound()
  }

  return (
    <PageWrapper
      pageTitle="AI Assistant"
      className="h-full"
      contentClassName="h-full min-h-0 items-center"
    >
      <div className="flex h-full w-full max-w-screen-md flex-col">
        {children}
      </div>
    </PageWrapper>
  )
}
AssistantLayout.displayName = "AssistantLayout"
