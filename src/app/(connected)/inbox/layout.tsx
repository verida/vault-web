import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { PageWrapper } from "@/components/layouts/page-wrapper"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { featureFlags } from "@/config/features"

export const metadata: Metadata = {
  title: "Inbox",
}

export type InboxLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function InboxLayout(props: InboxLayoutProps) {
  const { children, item } = props

  if (!featureFlags.inbox.enabled) {
    notFound()
  }

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <PageWrapper pageTitle="Inbox">
      <Suspense fallback={<InboxLoadingPage />}>{children}</Suspense>
      {item}
    </PageWrapper>
  )
}
InboxLayout.displayName = "InboxLayout"

export function InboxLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading inbox...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your inbox
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
InboxLoadingPage.displayName = "InboxLoadingPage"
