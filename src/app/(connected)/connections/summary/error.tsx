"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/error-page-content"

export default function ConnectionsSummaryErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting your data connections"
      error={error}
      reset={reset}
    />
  )
}
ConnectionsSummaryErrorPage.displayName = "ConnectionsSummaryErrorPage"
