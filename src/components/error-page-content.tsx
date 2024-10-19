"use client"

import Link from "next/link"
import { useEffect, useMemo } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  ErrorBlock,
  ErrorBlockDescription,
  ErrorBlockImage,
  ErrorBlockTitle,
} from "@/components/ui/error"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"
import { cn } from "@/styles/utils"

const logger = Logger.create("error-boundary")

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

type ErrorPageContentProps = {
  mainMessage?: string | null
  subMessage?: string | null
  resetButtonLabel?: string
  hideResetButton?: boolean
  showError?: boolean
  hideIllustration?: boolean
  navigationButtonLabel?: string
  navigationButtonHref?: string
  hideNavigationButton?: boolean
} & ErrorPageProps &
  React.ComponentProps<"div">

export function ErrorPageContent(props: ErrorPageContentProps) {
  const {
    error,
    reset,
    mainMessage,
    subMessage,
    resetButtonLabel = "Try again",
    hideResetButton = false,
    hideIllustration = false,
    showError = false,
    navigationButtonLabel = "Go to Home page",
    navigationButtonHref = getRootPageRoute(),
    hideNavigationButton = false,
    className,
    ...divProps
  } = props

  useEffect(() => {
    logger.error(error)
  }, [error])

  const main = useMemo(() => {
    return mainMessage === null ? null : mainMessage ?? "Something went wrong!"
  }, [mainMessage])

  const sub = useMemo(() => {
    return subMessage === null
      ? null
      : subMessage ?? "We apologize for the inconvenience"
  }, [subMessage])

  return (
    <div
      // TODO: Use container query?
      className={cn(
        "flex h-full flex-1 flex-col items-center justify-center p-4",
        className
      )}
      {...divProps}
    >
      <ErrorBlock className="gap-8">
        {!hideIllustration ? <ErrorBlockImage /> : null}
        {main ? <ErrorBlockTitle>{main}</ErrorBlockTitle> : null}
        {sub ? <ErrorBlockDescription>{sub}</ErrorBlockDescription> : null}
        {showError ? (
          <Alert variant="error">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : null}
        <div className="flex flex-row items-center gap-4">
          {!hideResetButton ? (
            <Button variant="outline" onClick={reset}>
              {resetButtonLabel}
            </Button>
          ) : null}
          {!hideNavigationButton ? (
            <Button variant="outline" asChild>
              <Link href={navigationButtonHref}>{navigationButtonLabel}</Link>
            </Button>
          ) : null}
        </div>
      </ErrorBlock>
    </div>
  )
}
