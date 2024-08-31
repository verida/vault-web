"use client"

import { useEffect } from "react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("ErrorBoundary")

type RootErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function RootError(props: RootErrorProps) {
  const { error, reset } = props

  useEffect(() => {
    logger.error(error)
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        <Typography variant="base-semibold">Something went wrong!</Typography>
        <Typography variant="base-regular" className="text-muted-foreground">
          We apologize for the inconvenience
        </Typography>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
