"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"
import { PlausibleScript } from "@/features/plausible/PlausibleScript"
import { sora } from "@/styles/font"
import { cn } from "@/styles/utils"

export default function GlobalErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <html>
      <head>
        <PlausibleScript />
      </head>
      <body className={cn("h-dvh", sora.variable)}>
        <ErrorPageContent error={error} reset={reset} hideNavigationButton />
      </body>
    </html>
  )
}
GlobalErrorPage.displayName = "GlobalErrorPage"
