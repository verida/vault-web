"use client"

import Link from "next/link"
import { ComponentProps, useEffect, useMemo, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { ERROR_REDIRECTION_DELAY } from "@/features/verida-auth/constants"
import { InvalidVeridaAuthRequest } from "@/features/verida-auth/types"
import { buildInvalidRequestRedirectUrl } from "@/features/verida-auth/utils"
import { cn } from "@/styles/utils"

export interface VeridaAuthInvalidRequestCardProps
  extends ComponentProps<typeof Card> {
  request: InvalidVeridaAuthRequest
}

export function VeridaAuthInvalidRequestCard(
  props: VeridaAuthInvalidRequestCardProps
) {
  const { request, className, ...cardProps } = props
  const [remainingSeconds, setRemainingSeconds] = useState(
    ERROR_REDIRECTION_DELAY / 1000
  )

  const redirectUrl = useMemo(() => {
    return buildInvalidRequestRedirectUrl(request, request.errorDescription)
  }, [request])

  useEffect(() => {
    if (!redirectUrl) {
      return
    }

    const redirectTimeout = setTimeout(() => {
      window.location.href = redirectUrl
    }, ERROR_REDIRECTION_DELAY)

    const countdownInterval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      clearTimeout(redirectTimeout)
      clearInterval(countdownInterval)
    }
  }, [redirectUrl])

  return (
    <Card className={cn("", className)} {...cardProps}>
      <ErrorBlock className="my-4">
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
      {redirectUrl ? (
        <div className="flex flex-col gap-4">
          <ErrorBlockDescription>
            {remainingSeconds > 0
              ? `You will be redirected to the original application in ${remainingSeconds} seconds`
              : "Please click the button below to return to the application."}
          </ErrorBlockDescription>
          <Button className="w-fit self-center" asChild>
            <Link href={redirectUrl}>Return to application</Link>
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
VeridaAuthInvalidRequestCard.displayName = "VeridaAuthInvalidRequestCard"
