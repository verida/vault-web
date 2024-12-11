import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function OAuthLoadingPage() {
  return (
    <LoadingBlock>
      <LoadingBlockSpinner />
      <LoadingBlockTitle>Loading...</LoadingBlockTitle>
      <LoadingBlockDescription>Please wait a moment</LoadingBlockDescription>
    </LoadingBlock>
  )
}
OAuthLoadingPage.displayName = "OAuthLoadingPage"
