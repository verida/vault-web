"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/error-page-content"

export default function DatabaseErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting your data"
      error={error}
      reset={reset}
    />
  )
}
DatabaseErrorPage.displayName = "DatabaseErrorPage"
