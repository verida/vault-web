import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

import { featureFlags } from "@/config/features"
import { AiAssistantDialogProvider } from "@/features/assistants/components/ai-assistant-dialog-provider"
import { AiPromptDialogProvider } from "@/features/assistants/components/ai-prompt-dialog-provider"

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
    <AiAssistantDialogProvider>
      <AiPromptDialogProvider>{children}</AiPromptDialogProvider>
    </AiAssistantDialogProvider>
  )
}
AssistantsLayout.displayName = "AssistantsLayout"
