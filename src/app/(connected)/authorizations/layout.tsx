import { notFound } from "next/navigation"
import React, { Suspense } from "react"

import { DeleteIcon } from "@/components/icons/delete-icon"
import { PlusIcon } from "@/components/icons/plus-icon"
import { PageWrapper } from "@/components/page-wrapper"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { featureFlags } from "@/config/features"
import { CreateAuthorizationDialog } from "@/features/authorized-apps/components/create-authorization-dialog"
import { RevokeAllAuthorizedAppsDialog } from "@/features/authorized-apps/components/revoke-all-authorized-apps-dialog"

type AuthorizationsLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function AuthorizationsLayout(props: AuthorizationsLayoutProps) {
  const { children, item } = props

  if (!featureFlags.veridaAuth.authorizedAppsUi.enabled) {
    notFound()
  }

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <PageWrapper
      pageTitle="Authorized Apps"
      rightContent={
        <div className="flex flex-row items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <RevokeAllAuthorizedAppsDialog>
                <Button
                  variant="outline-destructive"
                  className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
                >
                  <DeleteIcon className="size-5 shrink-0 sm:hidden" />
                  <span className="sr-only sm:not-sr-only">Revoke All</span>
                </Button>
              </RevokeAllAuthorizedAppsDialog>
            </TooltipTrigger>
            <TooltipContent>Revoke authorization for all apps</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateAuthorizationDialog>
                <Button
                  variant="primary"
                  className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
                >
                  <PlusIcon className="size-5 sm:hidden" />
                  <span className="sr-only sm:not-sr-only">Create</span>
                </Button>
              </CreateAuthorizationDialog>
            </TooltipTrigger>
            <TooltipContent>Create a new authorization</TooltipContent>
          </Tooltip>
        </div>
      }
      contentClassName="gap-8"
    >
      <div className="max-w-3xl text-muted-foreground">
        <Typography variant="base-regular">
          These applications have been authorized to access your personal data.
        </Typography>
        <Typography variant="base-regular">
          Consider reviewing the authorizations regularly and revoking any
          access that is no longer needed.
        </Typography>
        <Alert variant="warning" className="mt-4">
          <AlertTitle>Non-functional</AlertTitle>
          <AlertDescription>
            This Authorized Apps feature is not functional yet. Only the UI has
            been (partially) implemented for the moment.
          </AlertDescription>
        </Alert>
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
