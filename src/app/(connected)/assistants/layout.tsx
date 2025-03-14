import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { type ReactNode } from "react"

import { featureFlags } from "@/config/features"
import { AiAssistantDialogProvider } from "@/features/assistants/components/ai-assistant-dialog-provider"
import { AiPromptConfigDialogProvider } from "@/features/assistants/components/ai-prompt-config-dialog-provider"
import { AiPromptDialogProvider } from "@/features/assistants/components/ai-prompt-dialog-provider"

export const metadata: Metadata = {
  title: "AI Assistant",
}

export interface AssistantsLayoutProps {
  children: ReactNode
}

export default function AssistantsLayout(props: AssistantsLayoutProps) {
  const { children } = props

  if (!featureFlags.assistant.enabled) {
    notFound()
  }

  return (
    <AiAssistantDialogProvider>
      <AiPromptDialogProvider>
        <AiPromptConfigDialogProvider>{children}</AiPromptConfigDialogProvider>
      </AiPromptDialogProvider>
    </AiAssistantDialogProvider>
  )
}
AssistantsLayout.displayName = "AssistantsLayout"
