import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { cn } from "@/styles/utils"

type VeridaConnectionLoadingProps = Omit<
  React.ComponentPropsWithoutRef<typeof LoadingBlock>,
  "children"
>

export function VeridaConnectionLoading(props: VeridaConnectionLoadingProps) {
  const { className, ...loadingBlockProps } = props

  return (
    <LoadingBlock className={cn(className)} {...loadingBlockProps}>
      <LoadingBlockSpinner />
      <LoadingBlockTitle variant="heading-1">
        Connecting to Verida...
      </LoadingBlockTitle>
      <LoadingBlockDescription variant="base-l">
        Please wait while we establish a secure connection. This might take a
        moment.
      </LoadingBlockDescription>
    </LoadingBlock>
  )
}
VeridaConnectionLoading.displayName = "VeridaConnectionLoading"
