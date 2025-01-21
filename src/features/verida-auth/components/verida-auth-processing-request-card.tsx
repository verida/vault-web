import { Card, CardBody } from "@/components/ui/card"
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
      <CardBody className="py-3">
        <LoadingBlock>
          <LoadingBlockSpinner />
          <LoadingBlockTitle>Processing request</LoadingBlockTitle>
          <LoadingBlockDescription>
            We are processing the request. This may take a few seconds.
          </LoadingBlockDescription>
        </LoadingBlock>
      </CardBody>
    </Card>
  )
}
VeridaAuthProcessingRequestCard.displayName = "VeridaAuthProcessingRequestCard"
