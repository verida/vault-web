import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function ConnectionsSummaryLogsLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading connections logs...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your data connections logs
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
ConnectionsSummaryLogsLoadingPage.displayName =
  "ConnectionsSummaryLogsLoadingPage"
