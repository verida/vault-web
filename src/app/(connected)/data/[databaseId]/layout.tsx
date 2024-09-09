import { Suspense } from "react"

import { SubPageWrapper } from "@/components/sub-page-wrapper"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { getDataPageRoute } from "@/features/routes/utils"

type DatabaseLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function DatabaseLayout(props: DatabaseLayoutProps) {
  const { children, item } = props

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <SubPageWrapper
      backNavigationHref={getDataPageRoute()}
      backNavigationLabel="Back to all Data"
    >
      <Suspense fallback={<DatabaseLoadingPage />}>{children}</Suspense>
      {item}
    </SubPageWrapper>
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
