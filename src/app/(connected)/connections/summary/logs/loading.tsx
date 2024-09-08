import {
  Loading,
  LoadingDescription,
  LoadingSpinner,
  LoadingTitle,
} from "@/components/ui/loading"

export default function ConnectionsSummaryLogsLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <Loading>
        <LoadingSpinner />
        <LoadingTitle>Loading connections logs...</LoadingTitle>
        <LoadingDescription>
          Please wait while we are getting your data connections logs
        </LoadingDescription>
      </Loading>
    </div>
  )
}
ConnectionsSummaryLogsLoadingPage.displayName =
  "ConnectionsSummaryLogsLoadingPage"
