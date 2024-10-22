"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/error-page-content"
import { sora } from "@/styles/font"
import { cn } from "@/styles/utils"

export default function GlobalErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <html>
      <body className={cn("h-dvh", sora.variable)}>
        <ErrorPageContent error={error} reset={reset} hideNavigationButton />
      </body>
    </html>
  )
}
GlobalErrorPage.displayName = "GlobalErrorPage"
