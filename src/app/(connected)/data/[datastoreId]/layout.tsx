import { Suspense } from "react"

import { SubPageWrapper } from "@/components/sub-page-wrapper"
import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"
import { getDataPageRoute } from "@/features/routes/utils"

type DatastoreLayoutProps = {
  children: React.ReactNode
  item: React.ReactNode
}

export default function DatastoreLayout(props: DatastoreLayoutProps) {
  const { children, item } = props

  // Have to use a custom loading page because the item page is a modal for
  // which we don't want the conventional loading file to be displayed
  return (
    <SubPageWrapper
      backNavigationHref={getDataPageRoute()}
      backNavigationLabel="Back to all Data"
    >
      <Suspense fallback={<DatastoreLoadingPage />}>{children}</Suspense>
      {item}
    </SubPageWrapper>
  )
}
DatastoreLayout.displayName = "DatastoreLayout"

function DatastoreLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <Loading>
        <LoadingSpinner />
        <LoadingTitle>Loading data...</LoadingTitle>
        <LoadingDescription>
          Please wait while we are getting your data
        </LoadingDescription>
      </Loading>
    </div>
  )
}
DatastoreLoadingPage.displayName = "DatastoreLoadingPage"
