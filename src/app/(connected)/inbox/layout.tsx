import { Suspense } from "react"

import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"

type InboxLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function InboxLayout(props: InboxLayoutProps) {
  const { children, item } = props

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <>
      <Suspense fallback={<InboxLoadingPage />}>{children}</Suspense>
      {item}
    </>
  )
}
InboxLayout.displayName = "InboxLayout"

export function InboxLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <Loading>
        <LoadingSpinner />
        <LoadingTitle>Loading inbox...</LoadingTitle>
        <LoadingDescription>
          Please wait while we are getting your inbox
        </LoadingDescription>
      </Loading>
    </div>
  )
}
InboxLoadingPage.displayName = "InboxLoadingPage"
