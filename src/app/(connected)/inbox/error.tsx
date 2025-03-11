"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function InboxErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error getting your inbox"
      error={error}
      reset={reset}
    />
  )
}
InboxErrorPage.displayName = "InboxErrorPage"
