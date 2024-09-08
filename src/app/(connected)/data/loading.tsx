import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"

export default function DataLoadingPage() {
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
DataLoadingPage.displayName = "DataLoadingPage"
