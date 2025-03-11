import { ReactNode } from "react"

import { AiAssistantCombobox } from "@/app/(connected)/assistants/[assistantId]/_components/ai-assistant-combobox"
import { PageWrapper } from "@/components/layouts/page-wrapper"
import { Typography } from "@/components/ui/typography"

export interface AssistantLayoutProps {
  children: ReactNode
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
      className="gap-2 sm:gap-3 md:gap-6"
      pageTitle={
        <div className="flex min-w-0 flex-row items-center gap-2">
          <Typography variant="heading-3" className="shrink-0">
            AI Assistant
          </Typography>
          <AiAssistantCombobox assistantId={assistantId} className="flex-1" />
        </div>
      }
    >
      {children}
    </PageWrapper>
  )
}
AssistantLayout.displayName = "AssistantLayout"
