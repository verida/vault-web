import { notFound } from "next/navigation"
import React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { featureFlags } from "@/config/features"
import { CreateAuthorizationDialog } from "@/features/authorized-apps/components/create-authorization-dialog"
import { RevokeAllAuthorizedAppsDialog } from "@/features/authorized-apps/components/revoke-all-authorized-apps-dialog"

type AuthorizationsLayoutProps = {
  children: React.ReactNode
}

export default function AuthorizationsLayout(props: AuthorizationsLayoutProps) {
  const { children } = props

  if (!featureFlags.veridaOauth.authorizedAppsUi.enabled) {
    notFound()
  }

  return (
    <PageWrapper
      pageTitle="Authorized Apps"
      rightContent={
        <div className="flex flex-row items-center gap-2">
          <RevokeAllAuthorizedAppsDialog />
          <CreateAuthorizationDialog />
        </div>
      }
    >
      {children}
    </PageWrapper>
  )
}
AuthorizationsLayout.displayName = "AuthorizationsLayout"
