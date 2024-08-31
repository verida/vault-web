"use client"

import Link from "next/link"
import React from "react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"

export type AssistantErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function AssistantErrorPage(props: AssistantErrorPageProps) {
  const { reset } = props

  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Typography>
          Oops! Something went wrong with the AI Assistant
        </Typography>
        <Button variant="outline" onClick={reset}>
          Retry
        </Button>
        <Button asChild>
          <Link href={getRootPageRoute()}>Go to Home page</Link>
        </Button>
      </div>
    </div>
  )
}
