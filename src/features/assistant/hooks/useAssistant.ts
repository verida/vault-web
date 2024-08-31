import { useContext } from "react"

import { AssistantContext } from "@/features/assistant/contexts"

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider")
  }
  return context
}
