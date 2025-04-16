import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function OnboardingLoading() {
  return (
    <div className="flex h-full flex-1 flex-row items-center justify-center p-4">
      <LoadingBlock>
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Loading...</LoadingBlockTitle>
        <LoadingBlockDescription>
          Please wait while we are preparing the onboarding
        </LoadingBlockDescription>
      </LoadingBlock>
    </div>
  )
}
OnboardingLoading.displayName = "OnboardingLoading"
