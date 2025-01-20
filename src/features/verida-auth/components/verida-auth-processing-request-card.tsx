import { Card } from "@/components/ui/card"
import {
  LoadingBlock,
  LoadingBlockDescription,
  LoadingBlockSpinner,
  LoadingBlockTitle,
} from "@/components/ui/loading"
import { cn } from "@/styles/utils"

export interface VeridaAuthProcessingRequestCardProps
  extends React.ComponentProps<typeof Card> {}

export function VeridaAuthProcessingRequestCard(
  props: VeridaAuthProcessingRequestCardProps
) {
  const { className, ...cardProps } = props

  return (
    <Card className={cn("", className)} {...cardProps}>
      <LoadingBlock className="my-4">
        <LoadingBlockSpinner />
        <LoadingBlockTitle>Processing request</LoadingBlockTitle>
        <LoadingBlockDescription>
          We are processing the request. This may take a few seconds.
        </LoadingBlockDescription>
      </LoadingBlock>
    </Card>
  )
}
VeridaAuthProcessingRequestCard.displayName = "VeridaAuthProcessingRequestCard"
