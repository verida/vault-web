import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"

type AuthorizationsLayoutProps = {
  children: React.ReactNode
}

export default function AuthorizationsLayout(props: AuthorizationsLayoutProps) {
  const { children } = props

  if (!featureFlags.veridaOauth.authorizedAppsUi.enabled) {
    notFound()
  }

  return <PageWrapper pageTitle="Authorized Apps">{children}</PageWrapper>
}
AuthorizationsLayout.displayName = "AuthorizationsLayout"
