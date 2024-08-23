import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { getAssistantNewChatPageRoute } from "@/features/routes/utils"

export default function AssistantChatNotFoundPage() {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <p>This chat has not been found</p>
        <Button asChild className="w-fit">
          <Link href={getAssistantNewChatPageRoute()}>Start a new chat</Link>
        </Button>
      </div>
    </div>
  )
}
