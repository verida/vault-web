import Link from "next/link"
import React from "react"

import { Plus } from "@/components/icons/plus"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { getAssistantNewChatPageRoute } from "@/features/routes/utils"

type AssistantLayoutProps = {
  children: React.ReactNode
}

export default function AssistantLayout(props: AssistantLayoutProps) {
  const { children } = props

  return (
    <div className="flex flex-1 flex-col gap-6 pt-10">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="heading-3">AI Assistant</Typography>
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          <Button
            variant="primary"
            asChild
            // TODO: Rework the Button component, we should not have to overwrite the className like this
            className="h-auto p-2.5 sm:px-6 sm:py-3"
          >
            <Link href={getAssistantNewChatPageRoute()}>
              <span className="sr-only sm:not-sr-only">New Chat</span>
              <Plus className="size-5 text-background sm:hidden sm:size-6" />
            </Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
