"use client"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/layouts/error-page-content"

export default function RootErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return <ErrorPageContent error={error} reset={reset} hideNavigationButton />
}
RootErrorPage.displayName = "RootErrorPage"
