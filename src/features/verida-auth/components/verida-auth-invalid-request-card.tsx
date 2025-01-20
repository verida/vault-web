import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { InvalidVeridaAuthRequest } from "@/features/verida-auth/types"
import { cn } from "@/styles/utils"

export interface VeridaAuthInvalidRequestCardProps
  extends React.ComponentProps<typeof Card> {
  request: InvalidVeridaAuthRequest
}

export function VeridaAuthInvalidRequestCard(
  props: VeridaAuthInvalidRequestCardProps
) {
  const { request, className, ...cardProps } = props

  return (
    <Card className={cn("", className)} {...cardProps}>
      <ErrorBlock>
        <ErrorBlockImage />
        <ErrorBlockTitle>Invalid Request</ErrorBlockTitle>
        <ErrorBlockDescription>
          The Verida Auth request is invalid or missing. Please try again or
          contact the requesting application.
        </ErrorBlockDescription>
        <Alert variant="error">
          <AlertDescription>{request.errorDescription}</AlertDescription>
        </Alert>
      </ErrorBlock>
    </Card>
  )
}
VeridaAuthInvalidRequestCard.displayName = "VeridaAuthInvalidRequestCard"
