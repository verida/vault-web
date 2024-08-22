import { redirect } from "next/navigation"

import { getAssistantNewChatPageRoute } from "@/features/routes/utils"

export default function AssistantPage() {
  // TODO: Get latest conversation from session storage or redirect to new one
  redirect(getAssistantNewChatPageRoute())
}
