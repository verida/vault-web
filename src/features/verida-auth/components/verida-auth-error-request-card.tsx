import { useMemo } from "react"

import { Card, CardBody } from "@/components/ui/card"
import { VeridaAuthConsentError } from "@/features/verida-auth/components/verida-auth-consent-error"
import { ErrorVeridaAuthRequest } from "@/features/verida-auth/types"
import { buildErrorRedirectUrl } from "@/features/verida-auth/utils"
import { cn } from "@/styles/utils"

export interface VeridaAuthErrorRequestCardProps
  extends React.ComponentProps<typeof Card> {
  request: ErrorVeridaAuthRequest
}

export function VeridaAuthErrorRequestCard(
  props: VeridaAuthErrorRequestCardProps
) {
  const { request, className, ...cardProps } = props

  const errorRedirectUrl = useMemo(() => {
    if (!request.redirectUrl) {
      return null
    }

    return buildErrorRedirectUrl({
      redirectUrl: request.redirectUrl,
      state: request.state,
    })
  }, [request])

  return (
    <Card className={cn("", className)} {...cardProps}>
      <CardBody className="py-3">
        <VeridaAuthConsentError redirectUrl={errorRedirectUrl} />
      </CardBody>
    </Card>
  )
}
VeridaAuthErrorRequestCard.displayName = "VeridaAuthErrorRequestCard"
