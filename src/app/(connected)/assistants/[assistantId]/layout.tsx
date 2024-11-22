import React from "react"

import { AssistantSelector } from "@/app/(connected)/assistants/[assistantId]/_components/assistant-selector"
import { PageWrapper } from "@/components/page-wrapper"

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
      className="h-full gap-2"
      contentClassName="h-full min-h-0 pb-0 md:pb-0 xl:pb-0"
    >
      {children}
    </PageWrapper>
  )
}
AssistantLayout.displayName = "AssistantLayout"
