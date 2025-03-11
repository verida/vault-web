"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function DiscoverErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      mainMessage="There was an error loading the page"
      error={error}
      reset={reset}
    />
  )
}
DiscoverErrorPage.displayName = "DiscoverErrorPage"
