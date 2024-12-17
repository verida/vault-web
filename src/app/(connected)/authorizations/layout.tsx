import { notFound } from "next/navigation"
import React, { Suspense } from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { featureFlags } from "@/config/features"
import { CreateAuthorizationDialog } from "@/features/authorized-apps/components/create-authorization-dialog"
import { RevokeAllAuthorizedAppsDialog } from "@/features/authorized-apps/components/revoke-all-authorized-apps-dialog"

type AuthorizationsLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function AuthorizationsLayout(props: AuthorizationsLayoutProps) {
  const { children, item } = props

  if (!featureFlags.veridaOauth.authorizedAppsUi.enabled) {
    notFound()
  }

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <PageWrapper
      pageTitle="Authorized Apps"
      rightContent={
        <div className="flex flex-row items-center gap-2">
          <RevokeAllAuthorizedAppsDialog />
          <CreateAuthorizationDialog />
        </div>
      }
      contentClassName="gap-8"
    >
      <div className="text-muted-foreground">
        <Typography variant="base-regular">
          These applications have been authorized to access your personal data.
        </Typography>
        <Typography variant="base-regular">
          Consider reviewing the access regularly and revoking the authorization
          if it is no longer needed.
        </Typography>
      </div>
      <Suspense fallback={<AuthorizationsLoadingPage />}>{children}</Suspense>
      {item}
    </PageWrapper>
  )
}
AuthorizationsLayout.displayName = "AuthorizationsLayout"

function AuthorizationsLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading authorized apps...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your authorized apps
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
AuthorizationsLoadingPage.displayName = "AuthorizationsLoadingPage"
