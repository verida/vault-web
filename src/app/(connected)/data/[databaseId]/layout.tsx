import { type ReactNode, Suspense } from "react"

import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export interface DatabaseLayoutProps {
  children: ReactNode
  item: ReactNode
}

export default function DatabaseLayout(props: DatabaseLayoutProps) {
  const { children, item } = props

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <>
      <Suspense fallback={<DatabaseLoadingPage />}>{children}</Suspense>
      {item}
    </>
  )
}
DatabaseLayout.displayName = "DatabaseLayout"

function DatabaseLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading data...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your data
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
DatabaseLoadingPage.displayName = "DatabaseLoadingPage"
