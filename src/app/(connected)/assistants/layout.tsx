import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

import { featureFlags } from "@/config/features"

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

  return <>{children}</>
}
AssistantsLayout.displayName = "AssistantsLayout"
