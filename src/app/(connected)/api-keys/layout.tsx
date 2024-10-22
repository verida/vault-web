import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"

type ApiKeysLayoutProps = {
  children: React.ReactNode
}

export default function ApiKeysLayout(props: ApiKeysLayoutProps) {
  const { children } = props

  if (!featureFlags.apiKeys.enabled) {
    notFound()
  }

  return <PageWrapper pageTitle="API Keys">{children}</PageWrapper>
}
ApiKeysLayout.displayName = "ApiKeysLayout"
