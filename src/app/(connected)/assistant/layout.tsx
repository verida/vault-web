import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"

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
      contentClassName="h-full min-h-0 items-center"
    >
      <div className="flex h-full w-full max-w-screen-md flex-col">
        {children}
      </div>
    </PageWrapper>
  )
}
AssistantsLayout.displayName = "AssistantsLayout"
