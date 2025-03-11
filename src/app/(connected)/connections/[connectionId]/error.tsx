"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function ConnectionErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting this data connection"
      error={error}
      reset={reset}
    />
  )
}
ConnectionErrorPage.displayName = "ConnectionErrorPage"
