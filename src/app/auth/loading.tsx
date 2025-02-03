import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"

export default function AuthLoadingPage() {
  return (
    <LoadingBlock>
      <LoadingBlockSpinner />
      <LoadingBlockTitle>Loading...</LoadingBlockTitle>
      <LoadingBlockDescription>Please wait a moment</LoadingBlockDescription>
    </LoadingBlock>
  )
}
AuthLoadingPage.displayName = "AuthLoadingPage"
