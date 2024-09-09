import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function ConnectionsSummaryLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading connections...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your data connections
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
ConnectionsSummaryLoadingPage.displayName = "ConnectionsSummaryLoadingPage"
