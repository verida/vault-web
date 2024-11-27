"use client"

import { redirect } from "next/navigation"

import { useAssistants } from "@/features/assistants/hooks/use-assistants"
import { getAssistantPageRoute } from "@/features/routes/utils"

export default function AssistantsPage() {
  const { selectedAiAssistant } = useAssistants()

  redirect(
    getAssistantPageRoute({
      assistantId: selectedAiAssistant,
    })
  )
}
AssistantsPage.displayName = "AssistantsPage"
