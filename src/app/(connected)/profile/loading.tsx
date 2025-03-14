import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function ProfileLoadingPage() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading profile...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are getting your profile details
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
ProfileLoadingPage.displayName = "ProfileLoadingPage"
