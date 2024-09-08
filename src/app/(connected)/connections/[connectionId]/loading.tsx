import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function ConnectionLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading connection...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your data connection
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
ConnectionLoadingPage.displayName = "ConnectionLoadingPage"
