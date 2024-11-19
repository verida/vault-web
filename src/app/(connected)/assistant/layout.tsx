import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"
import { AssistantPromptDialogProvider } from "@/features/assistants/components/assistant-prompt-dialog-provider"

export const metadata: Metadata = {
  title: "AI Assistant",
}

type AssistantsLayoutProps = {
  children: React.ReactNode
}

export default function AssistantsLayout(props: AssistantsLayoutProps) {
  const { children } = props

  if (!featureFlags.assistant.enabled) {
    notFound()
  }

  return (
    <PageWrapper
      pageTitle="AI Assistant"
      className="h-full gap-0"
      contentClassName="h-full min-h-0 pb-0 md:pb-0 xl:pb-0"
    >
      <AssistantPromptDialogProvider>{children}</AssistantPromptDialogProvider>
    </PageWrapper>
  )
}
AssistantsLayout.displayName = "AssistantsLayout"
