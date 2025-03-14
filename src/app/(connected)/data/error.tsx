"use client"

import {
  ErrorPageContent,
  type ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function DataErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting your data"
      error={error}
      reset={reset}
    />
  )
}
DataErrorPage.displayName = "DataErrorPage"
