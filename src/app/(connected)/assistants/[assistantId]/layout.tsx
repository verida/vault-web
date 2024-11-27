import React from "react"

import { AiAssistantCombobox } from "@/app/(connected)/assistants/[assistantId]/_components/ai-assistant-combobox"
import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"

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
      className="h-full gap-2 sm:gap-3 md:gap-6"
      pageTitle={
        <div className="flex min-w-0 flex-row items-center gap-2">
          <Typography variant="heading-3" className="shrink-0">
            AI Assistant
          </Typography>
          <AiAssistantCombobox assistantId={assistantId} className="flex-1" />
        </div>
      }
      contentClassName="h-full min-h-0 pb-0 md:pb-0 xl:pb-0"
    >
      {children}
    </PageWrapper>
  )
}
AssistantLayout.displayName = "AssistantLayout"
