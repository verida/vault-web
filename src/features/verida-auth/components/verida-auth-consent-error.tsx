"use client"

import Link from "next/link"
import { type ComponentProps, useEffect, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { ERROR_REDIRECTION_DELAY } from "@/features/verida-auth/constants"
import { cn } from "@/styles/utils"

export interface VeridaAuthConsentErrorProps
  extends Omit<ComponentProps<typeof ErrorBlock>, "children"> {
  redirectUrl: string | null
  errorDescription?: string
}

export function VeridaAuthConsentError(props: VeridaAuthConsentErrorProps) {
  const { redirectUrl, errorDescription, className, ...errorBlockProps } = props

  const [remainingSeconds, setRemainingSeconds] = useState(
    ERROR_REDIRECTION_DELAY / 1000
  )

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
    <ErrorBlock className={cn("", className)} {...errorBlockProps}>
      <ErrorBlockImage />
      <ErrorBlockTitle>Error</ErrorBlockTitle>
      <ErrorBlockDescription>
        There was an error when granting access. Please try again later.
      </ErrorBlockDescription>
      {errorDescription ? (
        <Alert variant="error">
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      ) : null}
      {redirectUrl ? (
        <>
          <ErrorBlockDescription>
            {remainingSeconds > 0
              ? `You will be redirected to the original application in ${remainingSeconds} seconds`
              : "Please click the button below to return to the application."}
          </ErrorBlockDescription>
          <Button className="w-fit self-center" asChild>
            <Link href={redirectUrl}>Return to application</Link>
          </Button>
        </>
      ) : null}
    </ErrorBlock>
  )
}
VeridaAuthConsentError.displayName = "VeridaAuthConsentError"
