"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

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
import { cn } from "@/styles/utils"

export interface VeridaAuthInvalidRequestCardProps
  extends React.ComponentProps<typeof Card> {
  request: InvalidVeridaAuthRequest
}

export function VeridaAuthInvalidRequestCard(
  props: VeridaAuthInvalidRequestCardProps
) {
  const { request, className, ...cardProps } = props
  const { errorDescription, redirectUrl, state } = request
  const [remainingSeconds, setRemainingSeconds] = useState(
    ERROR_REDIRECTION_DELAY / 1000
  )

  const completedRedirectUrl = useMemo(() => {
    if (!redirectUrl) {
      return null
    }

    const url = new URL(redirectUrl)
    url.searchParams.set("error", "invalid_request")
    url.searchParams.set("error_description", errorDescription)
    url.searchParams.set("state", state ?? "")

    return url.toString()
  }, [errorDescription, redirectUrl, state])

  useEffect(() => {
    if (!completedRedirectUrl) {
      return
    }

    const redirectTimeout = setTimeout(() => {
      window.location.href = completedRedirectUrl
    }, ERROR_REDIRECTION_DELAY)

    const countdownInterval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      clearTimeout(redirectTimeout)
      clearInterval(countdownInterval)
    }
  }, [completedRedirectUrl])

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
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      </ErrorBlock>
      {completedRedirectUrl ? (
        <div className="flex flex-col gap-4">
          <ErrorBlockDescription>
            {remainingSeconds > 0
              ? `You will be redirected to the original application in ${remainingSeconds} seconds`
              : "Please click the button below to return to the application."}
          </ErrorBlockDescription>
          <Button className="w-fit self-center" asChild>
            <Link href={completedRedirectUrl}>Return to application</Link>
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
VeridaAuthInvalidRequestCard.displayName = "VeridaAuthInvalidRequestCard"
