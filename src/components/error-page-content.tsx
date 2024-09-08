"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo } from "react"

import ErrorIllustration from "@/assets/error-illustration.svg"
import { Typography } from "@/components/typography"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"
import { cn } from "@/styles/utils"

const logger = Logger.create("ErrorBoundary")

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
      <div className="flex flex-col items-center gap-8 text-center">
        {!hideIllustration ? (
          <Image
            src={ErrorIllustration}
            width={121}
            height={140}
            alt="error"
            className="h-[105px] md:h-[140px]"
          />
        ) : null}
        {main ? (
          <Typography variant="heading-5" component="p">
            {main}
          </Typography>
        ) : null}
        {sub ? (
          <p className="text-muted-foreground">
            <Typography variant="base-regular">{sub}</Typography>
          </p>
        ) : null}
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
      </div>
    </div>
  )
}
