import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReactNode, Suspense } from "react"

import { PlusIcon } from "@/components/icons/plus-icon"
import { PageWrapper } from "@/components/layouts/page-wrapper"
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
import { Typography } from "@/components/ui/typography"
import { featureFlags } from "@/config/features"
import {
  CreateAuthorizationDialog,
  CreateAuthorizationDialogTrigger,
} from "@/features/authorized-apps/components/create-authorization-dialog"

export const metadata: Metadata = {
  title: "Authorized Apps",
}

export interface AuthorizationsLayoutProps {
  children: ReactNode
  item: ReactNode
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
            <CreateAuthorizationDialog>
              <CreateAuthorizationDialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="primary"
                    className="h-12 w-12 p-0 sm:w-auto sm:px-6 sm:py-2"
                  >
                    <PlusIcon className="size-5 sm:hidden" />
                    <span className="sr-only sm:not-sr-only">Create</span>
                  </Button>
                </TooltipTrigger>
              </CreateAuthorizationDialogTrigger>
            </CreateAuthorizationDialog>
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
