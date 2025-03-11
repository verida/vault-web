import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function DiscoverLoading() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading applications...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting the available applications
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
DiscoverLoading.displayName = "DiscoverLoading"
