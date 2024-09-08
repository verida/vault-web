import { notFound } from "next/navigation"
import React from "react"

import { Typography } from "@/components/typography"
import { featureFlags } from "@/config/features"

type AssistantLayoutProps = {
  children: React.ReactNode
}

export default function AssistantLayout(props: AssistantLayoutProps) {
  const { children } = props

  if (!featureFlags.assistant.enabled) {
    notFound()
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="heading-3">AI Assistant</Typography>
      </div>
      <div className="flex h-full min-h-0 flex-col items-center">
        <div className="flex h-full w-full max-w-screen-md flex-col pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}
AssistantLayout.displayName = "AssistantLayout"
