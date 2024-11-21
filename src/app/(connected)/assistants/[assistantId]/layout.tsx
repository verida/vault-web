import { Metadata } from "next"
import React from "react"

import { AssistantSelector } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-selector"
import { PageWrapper } from "@/components/page-wrapper"
import { AiPromptDialogProvider } from "@/features/assistants/components/ai-prompt-dialog-provider"

export const metadata: Metadata = {
  title: "AI Assistant",
}

type AssistantLayoutProps = {
  children: React.ReactNode
  params: {
    assistantId: string
  }
}

export default function AssistantLayout(props: AssistantLayoutProps) {
  const {
    children,
    params: { assistantId: encodedAssistantId },
  } = props
  const assistantId = decodeURIComponent(encodedAssistantId)

  return (
    <PageWrapper
      pageTitle={<AssistantSelector assistantId={assistantId} />}
      className="h-full gap-0"
      contentClassName="h-full min-h-0 pb-0 md:pb-0 xl:pb-0"
    >
      <AiPromptDialogProvider>{children}</AiPromptDialogProvider>
    </PageWrapper>
  )
}
AssistantLayout.displayName = "AssistantLayout"
